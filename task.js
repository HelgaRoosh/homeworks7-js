class AlarmClock {
    constructor() {
        this.alarmCollection = [],
        this.timerId = null
    }

    addClock(time, callback, id) {
        if(isNaN(id)) {
            throw new Error('error text');
        }else if (this.alarmCollection.find(item => item.id === id) !== undefined) {
            return console.error("звонок уже существует");
            
        } else { 
        return this.alarmCollection.push({id, time, callback});
        }
    }

    removeClock(id) {
        let startLength = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter(item => item.id !== id);
        return (startLength > this.alarmCollection.length);
    }

    getCurrentFormattedTime() { 
        let recordTime = (number) => {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        let nowTime = new Date();
        return recordTime(nowTime.getHours()) + ':' + recordTime(nowTime.getMinutes());
    }

    start() {
        let checkClock = (alarm) => {
            if (alarm.time === this.getCurrentFormattedTime()) {
                return alarm.callback();
            }
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach(alarm => checkClock(alarm));
            }, 60);
        }
        return;
    }

    stop() { 
        if(this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    } 


    printAlarms() {
        this.alarmCollection.forEach(item => console.log(item.id + ':' + item.time));
    }


    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }  


}

function testCase() {
    let testAlarm = new AlarmClock;
    testAlarm.start();
    testAlarm.addClock('14:22', () => console.log ('дайте кофи!'), 1);
    testAlarm.addClock('14:23', () => console.log ('КОООфи'), 2);
    testAlarm.addClock('14:24', () => console.log ('где мой кофе?'), 3);
    testAlarm.addClock('14:25', () => console.log ('пора бы поспать'), 4);
    testAlarm.printAlarms();
    testAlarm.removeClock(4);
    testAlarm.addClock('14:26', () => {
        testAlarm.stop();
        console.log ('спать еще рано');
        }, 5);
    testAlarm.printAlarms();  
}
testCase();
