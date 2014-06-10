### ISIC Derm Annotator app

Rich Stoner, 2014

#### Install

To be used with: https://github.com/richstoner/simple-application-framework

`fab last addApp:appname=annotatordev,giturl=https://github.com/richstoner/isic_annotator.git`

`fab last enableApp:annotatordev`

You can now start this app via the supervisor configuration

##### To update the app from git after enabled:

`fab last updateApp:annotatordev`

`fab last restartAll` (this could be more elegant!)



#### Application structure


