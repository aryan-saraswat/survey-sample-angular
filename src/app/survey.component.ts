import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import * as Survey from "survey-angular";
//import * as widgets from "surveyjs-widgets";

import { init as initCustomWidget } from "./customwidget";

/*widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
//widgets.emotionsratings(Survey);*/
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

Survey.StylesManager.applyTheme("default");

@Component({
  // tslint:disable-next-line:component-selector
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`,
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  json: object;
  result: any;

  ngOnInit() {
    const surveyModel = new Survey.Model(this.json);
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) {
        return;
      }
      // Add a button;
      const btn = document.createElement("button");
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      btn.onclick = function () {
        // showDescription(question);
        alert(options.question.popupdescription);
      };
      const header = options.htmlElement.querySelector("h5");
      const span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });

    surveyModel.onComplete.add((result, options) => {
      this.submitSurvey.emit(result.data);
      this.result = result.data;
      console.log(this.result); //extra

      let name = this.result['name']
      let email = this.result['email']
      let howOften = this.result['howOften']
      let choice = this.result['choice']
      console.log(name, email, howOften, choice);

      var query = `
      mutation createPerson($name: String!, $email: String!, $howOften: Frequency!, $choice: Choice!)
      {
        createPerson(name: $name, email: $email, howOften: $howOften, choice: $choice)
        {
          id,
          name,
          email,
          howOften,
          choice
          }
        }`;

        fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              name: name,
              email: email,
              howOften: howOften,
              choice: choice
            }
          })
        })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    });

    /*surveyModel.onComplete.add(function (sender, options) { //extra
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:4000/");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(sender.data));
  });*/


    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  }
}