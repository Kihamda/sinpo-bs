@echo off
setlocal

cd 
if not exist "venv" (
    echo Building python environment...
    mkdir venv
    tar -xf py.zip -C venv

    venv\Scripts\python.exe venv\Scripts\pip.exe install flask 
    venv\Scripts\python.exe venv\Scripts\pip.exe install Flask-SQLAlchemy 

)

echo Starting server...
venv\Scripts\python.exe server.py
pause