const Character = function(param) {
    this.name = param.name;
    this.server = param.surname;
    this.gender = param.gender;
};

Character.prototype.walk = function() {
    console.log(this.name + 'walk')
};

Character.prototype.run = function() {
    console.log(this.name + 'run')
};

Character.prototype.mainSkill = function() {
    console.log(this.name + 'использует способность')
};

const Race = function(param) {
    Character.apply(this, arguments);
    this.race = param.race;
    this.skin = param.skin;
    this.class = param.class;
};

const Class = function(param) {
    Race.apply(this, arguments);
    this.class = param.class;
    this.specialSkills = getSpecialSkill();
    this.state = param.state;

    this.getSpecialSkill() {
        if(this.class === 'war') {
            return 'Удар мечом'
        }
    }
};


Class.prototype.classSkill = function() {
    console.log(this.race + this.name + this.class + 'использует класовою способность' + this.specialSkills())
};

const char = new Character({});
const race = new Race({});
const classes = new Class({});

const war = new Class({
    name: 'МаксВоин',
    server: 'EPIC GAME',
    gender: 'MAN',
    race: 'Ork',
    class: 'war'
})

console.log(war)