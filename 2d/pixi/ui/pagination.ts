import UI from "@/core/2d/pixi/ui/ui";
import { Graphics, Text, DisplayObject, Rectangle } from "pixi.js";

class Pagination extends UI {

  view: Graphics;

  protected offset: number = 0;

  protected pageButtons: number = 5;

  protected buttons: Graphics[] = [];

  constructor(options: PaginationOptions) {
    super(options);
    this.view = this.createView();
    this.pages = Math.ceil(this.total / this.pageSize);
    this.page = 1;
    this.update();
  }

  createView(): Graphics {
    const { size, position } = this;
    const box = new Graphics();
    box.beginFill(0x000000, 0);
    box.lineStyle(2, 0xA93209, 0.1);
    box.drawRoundedRect(0, 0, size.width, size.height, 10);
    box.endFill();
    box.position.set(position.x, position.y);
    return box;
  }

  createButton(index: number, show: boolean = true, str: string | null = null): void {
    const { size } = this;
    const button = new Graphics();
    button.beginFill(0x000000, 0.5);
    button.lineStyle(1, 0xA93209, 2);
    button.drawRoundedRect(0, 0, size.height, size.height, 20);
    button.endFill();
    button.position.set(this.startX + size.height * this.buttons.length, 0);
    button.visible = show;
    
    const text = new Text(!!str ? str : index.toString(), { 
      fill: index === this.page ? 0x6868AB : 0xFFFFFF,
      fontSize: 18,
    });
    text.position.set(button.width * 0.5, button.height * 0.5);
    text.pivot.set(text.width * 0.5, text.height * 0.5);
    button.addChild(text);

    button.hitArea = new Rectangle(0, 0, button.width, button.height);

    if(index > 0 && index !== this.page && show) {
      button.on('pointerup', () => {
        this.page = index;
        this.update();
        this.$emit('page_select', index);
      });
      this.enableButton(button);
    } else {
      this.disableButton(button);
    }

    this.view.addChild(button);
    this.buttons.push(button);
  }

  enableButton(button: DisplayObject) {
    button.cursor = 'pointer';
    button.eventMode = 'static';
  }

  disableButton(button: DisplayObject) {
    button.cursor = 'default';
    button.eventMode = 'none';
  }

  update() {

    this.buttons.forEach(button => this.view.removeChild(button));
    this.buttons = [];

    const maxButtons = Math.floor(this.maxButtons || 5);
    const from = Math.max(1, Math.min(this.page - maxButtons, this.pages - maxButtons * 2 - 1));
    const to = Math.min(this.pages, Math.max(this.page + maxButtons, maxButtons * 2 + 1));

    this.buttonsCount = maxButtons * 2 + 1
          + Number(this.showStartAndEnd) * 2
          + Number(this.showNextAndPrev) * 2
          + Number(!!this.distantPages) * 4;
    const buttonsWidth = this.size.height * this.buttonsCount;
    this.startX = (this.view.width - buttonsWidth) / 2;

    if (this.showStartAndEnd) {
      this.createButton(1, true, '<<');
    }

    if (this.showNextAndPrev) {
      this.createButton(Math.max(1, this.page - 1), true, '<');
    }

    if (this.distantPages) {
      const showDistantPage = from >= this.distantPages;
      this.createButton(Math.max(1, from - this.distantPages), showDistantPage);
      this.createButton(-1, showDistantPage, '...');

    }

    for (let i = from; i <= to; i++) {
      this.createButton(i);
    }

    if (this.distantPages) {
      const showDistantPage = this.page < this.pages - this.distantPages;
      this.createButton(-1, showDistantPage, '...');
      this.createButton(Math.min(this.pages, to + this.distantPages), showDistantPage);
    }

    if (this.showNextAndPrev) {
      this.createButton(Math.min(this.pages, this.page + 1), true, '>');
    }
    
    if (this.showStartAndEnd) {
      this.createButton(this.pages, true, '>>');
    }

  }

}

export default Pagination;