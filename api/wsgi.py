import eventlet

#Monkey patch to allow for async actions (aka multiple workers)
eventlet.monkey_patch()

from qsystem import application, socketio

if __name__ == "__main__":
    socketio.run(application, debug=True)
