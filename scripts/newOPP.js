class Character {
    constructor(param) {
        this.name = param.name;
        this.server = param.surname;
        this.gender = param.gender;
    };

    walk = function() {
        console.log(this.name + 'walk')
    };

    run = function() {
        console.log(this.name + 'run')
    };

    mainSkill = function() {
        console.log(this.name + 'использует способность')
    };
}

class Race extends Character {

    constructor(param) {
        super(param);
        this.race = param.race;
    }

    mainSkill = function() {
        console.log(this.name + ' ' + this.name + 'Использует суперспособ')
    }

};

class Class extends Race {
    constructor(param) {
        super(param);
        this.class = param.class;
    }

    getSpecialSkill() {
        if(this.class === 'war') {
            return 'Удар мечом'
        }
    }

    classSkill = function() {
        console.log(this.race + this.name + this.class + 'использует класовою способность' + this.getSpecialSkill())
    };
};

const war = new Class({
    name: 'МаксВоин',
    server: 'EPIC GAME',
    gender: 'MAN',
    race: 'Ork',
    class: 'war'
});

console.log(war)
