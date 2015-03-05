### The &lt;questions> Directive

The Questions directive is a way to ensure uniform presentation of questions to the user. It also allows makes it easy to update and change formatting uniformly across the application as well.

From the html template where this directive is needed, it can be implemented as such:

```html
<questions queries="queries" plan-group="plan.assets"></questions>
```

<code>queries</code> is a collection of question objects, in this case (from plan-builder states) this refers to <code>$scope.queries</code> from the respective states' controller.

<code>plan</code> is what the variables within the directive and sub-directives will be bound to. In this case, <code>questions</code> will have input that is bound to <code>$scope.plan</code>.


### Question Objects

A question object has several properties detailed below:
* <code>title</code> - always required, string, 1-3 words for the link/accordion header title.
<br><br>
* <code>question</code> - always required (unless type is <code>multi</code>), string, text to display to the user to retrieve needed info.
<br><br>
* <code>bind</code> always required (unless type is <code>multi</code>), string, defines what variable of the plan object the input should bind to.
<br><br>
* <code>condition</code> Not required, string. If defined, this question will only appear if <code>$scope.plan.SOME_PROPERTY</code> is true.
<br><br>
* <code>type</code> - always required, string, determine type of question slide to show. There are several different slide types:
  - <code>"select"</code> - dropdown menu, must provide <code>options</code>
  - <code>"checkbox"</code> - list of checkboxes, must provide <code>options</code>
  - <code>"radio"</code> - list of radio options, must provide <code>options</code>
  - <code>"button"</code> - list of buttons, must provide <code>options</code>
  - <code>"table"</code> - table-stype input, must provide <code>fields</code>
  - <code>"multi"</code> - for slides that contain more than one question, must provide <code>subqueries</code>
  - <code>"review"</code> - this is intended to be the final slide in the section. This should display a nice representation of the data the user has entered (eg. their Net Worth Statement, or their Risk Analysis). Must provide an html <code>template</code> for this display.
  - or any basic HTML5 input: <code>"text"</code>, <code>"date"</code>, <code>"month"</code>, <code>"color"</code>, <code>"datetime"</code>, <code>"datetime-local"</code>, <code>"email"</code>, <code>"number"</code>, <code>"range"</code>, <code>"search"</code>, <code>"tel"</code>, <code>"time"</code>, <code>"url"</code>, <code>"week"</code> will all display a simgle input of that type.
<br><br>
* <code>options</code> - required if type is select, checkbox, radio, or button. Must be an array of objects, each with the following properties:
  - <code>text</code> - required, string, defines the text to display of the option.
  - <code>value</code> - required, string, defines the value property of the option.
<br><br>
* <code>fields</code> - required if type is table. Must be an array of objects, each representing one column of the table with three properties:
  - <code>label</code> - required, string, label of the column.
  - <code>type</code> - required, string, defines type of input for respective column.
  - <code>textAlign</code> - required, string, aligns text (left or right).
* <code>subqueries</code> - required if type is multi or prescreen. Must be an array of question objects with the following properties:
  - <code>question</code> - required, string, text to display above input.
  - <code>type</code> - required, string, defines type of input.
  - <code>bind</code> - required, string, defines what variable of the plan object the input should bind to.
  - <code>condition</code> - not required, string. If defined, this question will only appear if $scope.plan[property] is true.
  - If type is multi, these will be displayed within the question slide.
* <code>template</code> - required if final/review slide, HTML template, to display snapshot of what the user entered in current section. You may use <code>{{plan.SOME_PROPERTY}}</code> in this template.


### Example Implementation

```javascript
$scope.queries = [
  // Plain text example
  {
    title: 'Plain Text',
    question: "This is an example of a plain text input, type something in.",
    bind: 'textthing',
    type: 'text'
  },
  // Select option example
  {
    title: 'Select',
    question: "This is an example of a select input, select something.",
    bind: 'selectAttribute',
    type: 'select',
    options: [
      {
        text: 'Select 1',
        value: true
      }, {
        text: 'Select 2',
        value: false
      }
    ]
  },
  // Checkbox example
  {
    title: 'Checkbox',
    question: "This is an example of a checkbox input, check stuff.",
    bind: 'checkedAttributes',
    type: 'checkbox',
    options: [
      {
        text: 'Check Option 1',
        value: 'One'
      }, {
        text: 'Check Option 2',
        value: 'Two'
      }, {
        text: 'Check Option 3',
        value: 'Three'
      }
    ]
  },
  // Radio option example
  {
    title: 'Radio',
    question: "This is an example of a radio input, choose something.",
    bind: 'Attribute',
    type: 'radio',
    options: [
      {
        text: 'Radio Option 1',
        value: 1
      }, {
        text: 'Radio Option 2',
        value: 2
      }, {
        text: 'Radio Option 3',
        value: 3
      }
    ]
  },
  // Button example
  {
    title: 'Button',
    question: "This is an example of a button input, click something (the buttons don't do anything yet).",
    bind: 'Attribute',
    type: 'button',
    options: [
      {
        text: 'Button 1',
        value: function() { alert('Button 1!') }
      }, {
        text: 'Button 2',
        value: function() { alert('Button 2!') }
      }
    ]
  },
  // Table example
  {
    title: 'Table',
    question: "This is an example of a table input.",
    bind: 'fromTable',
    type: 'table',
    fields: [
      {
        label: 'Column One (string)',
        type: 'text',
        textAlign: 'left'
      }, {
        label: 'Column Two (number)',
        type: 'number',
        textAlign: 'right'
      }
    ]
  },
  // Multi-question example
  {
    title: 'Multi-Question',
    type: 'multi',
    subqueries: [
      {
        question:'What is your first name?',
        type:'text',
        bind:'firstname'
      }, {
        question:'What is your last name?',
        type:'text',
        bind:'lastname'
      }, {
        question:'When were you born?',
        type:'date',
        bind:'birthdate'
      }
    ]
  }
];
```
