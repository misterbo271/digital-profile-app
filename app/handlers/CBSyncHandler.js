import TaskManager from 'controls/TaskManager';

export default class CBSyncHandler {

    static tasks = null;

    static sync() {
        this.tasks = new TaskManager();
        this.tasks.MAX_RUNNING_TASK = 2;

        this.tasks.doTask(() => {
            this.tasks.clear();
        });
    }

    static clear() {
        if (this.tasks) {
            this.tasks.clear();
            this.tasks = null;
        }
    }
}
