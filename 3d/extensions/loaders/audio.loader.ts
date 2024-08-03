import { AudioLoader as ThreeAudioLoader } from 'three';
//import { isAgent } from '$core/utils/agent';

const FORMATS = {
    ogg: 'audio/ogg',
    mp3: 'audio/mp3',
    wav: 'audio/mp3'
};

class AudioLoader extends ThreeAudioLoader {
    load(url: string, onLoad: (data: AudioBuffer) => void, onProgress: (event: ProgressEvent<EventTarget>) => void, onError: (error: unknown) => void) {
        const matches = url.match(/\{([a-z,]+)\}$/);
        const formats = !!matches ? matches[1].split(',') : [];
        const audio = document.createElement('audio');

        if (matches && matches[0]) {
            for(const format of formats) {
                if (audio.canPlayType(FORMATS[format as keyof typeof FORMATS])) {
                    url = url.replace(matches[0], format);
                    break;
                }
            }
        }

        super.load(url, onLoad, onProgress, onError);
    }
}

export default AudioLoader;