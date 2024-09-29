import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  CommonModule,
  NgIf
} from '@angular/common';
import {
  ChangeEvent,
  CKEditorModule
} from '@ckeditor/ckeditor5-angular';

import {
  ClassicEditor,
  type EditorConfig
} from 'ckeditor5';

import translations from 'ckeditor5/translations/pt-br.js';
import { plugins } from '@c/articles/constants/plugins';
import { toolbar } from '@c/articles/constants/toolbar';
import { blockToolbar } from '@c/articles/constants/blockToolbar';
import { heading } from '@c/articles/constants/heading';
import { style } from '@c/articles/constants/style';
import { table } from '@c/articles/constants/table';
import { balloonToolbar } from '@c/articles/constants/balloonToolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  fontFamily,
  fontSize,
  htmlSupport,
  image,
  language,
  link,
  list
} from '@c/articles/constants/defaultConfig';
import { FormsModule } from '@angular/forms';

@Component({
             selector: 'cs-root',
             standalone: true,
             imports: [NgIf, CKEditorModule, MatButtonModule, MatDividerModule, MatIconModule, FormsModule],
             templateUrl: './article-simple.component.html',
             styleUrls: ['./article-simple.component.sass'],
             encapsulation: ViewEncapsulation.None
           })
export class ArticleSimpleComponent
  implements AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  public ngAfterViewInit(): void {
    this.config = {
      toolbar,
      plugins,
      balloonToolbar,
      blockToolbar,
      fontFamily,
      fontSize,
      heading,
      htmlSupport,
      image,
      initialData: '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>',
      language,
      link,
      list,
      menuBar: {
        isVisible: true
      },
      placeholder: 'Type or paste your content here!',
      style,
      table,
      translations: [translations]
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    console.log(data);
  }

  onSave() {
    console.log(this.model.editorData);
  }
}
