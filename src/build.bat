@echo off
@title Front End Integrated Solution  shell script release...

echo Front End Integrated Solution  window script 

@echo fis3 release -c
@echo release -cw --root ./ --dest ../src
fis3 release -cL --root ./ --dest ../dist

pause