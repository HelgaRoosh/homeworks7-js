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
        let checkClock = function(alarm) {
            if (alarm.time === this.getCurrentFormattedTime()) {
                return alarm.callback();
            }
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach(alarm => checkClock(alarm));
            }, 60);
        }
        return;/* Создайте функцию проверки (checkClock), которая принимает звонок и проверяет: 
        если текущее время совпадает со временем звонка, то вызывайте колбек.
        Если значение идентификатора текущего таймера отсутствует, то создайте новый интервал.
        В этом интервале реализуйте функцию, которая будет перебирать все звонки, и для 
        каждого вызывать функцию checkClock.
        Результат функции setInterval сохраните в свойстве идентификатора текущего таймера. */
    }

    stop() { //не трогай, тест прошел
        if(this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    } 


    printAlarms() {//хз но лучше не трогай
        this.alarmCollection.forEach(item => console.log(item.id + ':' + item.time));
    }


    clearAlarms() {//не трогай тест прошел
        this.stop();
        this.alarmCollection = [];
    }  


}

function testCase() {
    let testAlarm = new AlarmClock;
    testAlarm.addClock('01:30', () => console.log ('дайте кофи!'), 1);
    testAlarm.addClock('01:32', () => console.log ('КОООфи'), 2);
    testAlarm.addClock('01:34', () => console.log ('где мой кофе??'), 3);
    testAlarm.addClock('01:36', () => console.log ('пора бы поспать'), 4);
    testAlarm.removeClock(4);
    testAlarm.start();
    testAlarm.stop();
    testAlarm.printAlarms();
}
testCase();