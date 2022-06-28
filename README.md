# Yet Another Form Builder

An extendable form builder. You can easily add your own fields and exporters. Works in the browser via LocalStorage. You can download and upload form definitions allowing you to share your work as and when needed.

![screenshot](https://formbuilder.phgo.xyz/assets/demo.png)


### Demo

[Test it out here](https://formbuilder.phgo.xyz)


### Built in Fields

- Currency
- Date
- Date Time
- Email
- Number
- Range
- Select
- Spacer
- Text
- Textarea


### Built in Exporters

- Bootstrap 4
- Backpack for Laravel
- Source JSON file

### Files

`app.js`:

Main application file. Written in AngularJS.

`app.localstorage.js`:

LocalStorage stuff. You can customize your default form here.

`app.fields.js`:

Field definitions. You can add your own fields here. Feel free to create a pull request if you think your added fields belongs here. :)

`app.exporters.js`:

Exporter definitions. You can add your own custom exporter here. The JSON structure representing the form can be viewed by navigating to `Export > View Source > Generate`. Feel free to create a pull request if you think your exporter belongs here. :)


---

#### MIT License

Copyright (c) 2022 Pahang Go Sdn Bhd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.