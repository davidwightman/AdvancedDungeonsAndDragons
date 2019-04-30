function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

new Vue({
    el: '#app',
    data: {
        monsterTypes: [
            {name: 'Orc', image: 'orc.jpg', hitPoints: 50, divideBy: .5},
            {name: 'Troll', image: 'troll.jpg', hitPoints:200, divideBy: 2},
            {name: 'Eye Of The Beholder', image: 'eyeOfTheBeholder.jpg', hitPoints: 25, divideBy: .25},
            {name: 'Mindflayer', image: 'mindflayer.jpg', hitPoints: 25, divideBy: .25},
            {name: 'Black Dragon', image: 'blackDragon.jpg', hitPoints: 100, divideBy: 1},
            {name: 'Platinum Dragon', image: 'platinumDragon.jpg', hitPoints: 400, divideBy: 4}],
        playingGame: false,
        you: 100,
        monsterHitPoints: undefined,
        battle: [],
        characterClass: '',
        characterImage: '',
        monsterImage: '',
        monsterType: '',
        monsterDivideHitPoints: '',
        monsterBackgroundColor: 'green', //'#eee',
        gameOver: false,
        alert: false,
        points: 0,
        monsterPoints: 0,
        name: '',
        selectName: false,
        highScores: []
    },
    methods: {
        startGame: function(event){
            //this.playingGame = !this.playingGame;
            if (event === 'Paladin') {
                this.characterClass = 'Paladin'
                this.characterImage = 'paladin.jpg'
            } else {
                this.characterClass = 'Warrior'
                this.characterImage = 'warrior.jpg'
            }
            this.selectName = true
        },
        afterName: function(){
            this.name = this.name
            let monsterSelector = getRandomInt(6)
            this.monsterType = this.monsterTypes[monsterSelector].name
            this.monsterImage = this.monsterTypes[monsterSelector].image
            this.monsterHitPoints = this.monsterTypes[monsterSelector].hitPoints
            this.monsterDivideHitPoints = this.monsterTypes[monsterSelector].divideBy
            this.selectName = false
            this.gameOver = false
            this.playingGame = true
        },
        giveUp: function(event){
            this.gameOver = false;
            this.alert = false;
            this.you = 100;
            this.monsterHitPoints = undefined;
            this.battle = []
            this.playingGame = !this.playingGame;
            this.characterClass= ''
            this.characterImage= ''
            this.monsterImage= ''
            this.monsterType=''
            this.points = 0
        },
        playAgain: function () {
            this.playingGame = true
            this.gameOver = false;
            this.alert = false;
            this.monsterHitPoints = undefined;
            this.battle = []
            this.playingGame = true;
            let monsterSelector = getRandomInt(6)
            this.monsterType = this.monsterTypes[monsterSelector].name
            this.monsterImage = this.monsterTypes[monsterSelector].image
            this.monsterHitPoints = this.monsterTypes[monsterSelector].hitPoints
            this.monsterDivideHitPoints = this.monsterTypes[monsterSelector].divideBy
        },
        attack: function(event){
            if (this.monsterHitPoints === 0) {
                this.battle.push({
                    monster: ``, 
                    you: "You've already defeated the monster!"
                })
                return
            }
            let message = {}
            let youInjured;
            if (this.monsterType === 'Orc'){
                youInjured = getRandomInt(10);
            } else if (this.monsterType === 'Troll') {
                youInjured = getRandomInt(20);
            } else if (this.monsterType === 'Black Dragon') {
                youInjured = getRandomInt(30);
            } else if (this.monsterType === 'Platinum Dragon') {
                youInjured = getRandomInt(50);
            } else if (this.monsterType === 'MindFlayer') {
                youInjured = getRandomInt(60);
            } else {
                youInjured = getRandomInt(50);
            }
            let monsterInjured = getRandomInt(20);
            this.you = this.you - youInjured;
            this.monsterHitPoints = this.monsterHitPoints - monsterInjured;
            message.monster = monsterInjured !== 0 ?  `${this.characterClass} hits ${this.monsterType} for ${monsterInjured} hit points of damage.` :
            `${this.characterClass} completely misses ${this.monsterType}! Sorry, no damage inflicted this round.`
            message.you = youInjured !== 0 ? `${this.monsterType} hits ${this.characterClass} for ${youInjured} hit points of damage.` : `Whew! ${this.monsterType} completely misses ${this.characterClass}! Luckily no damage inflicted this round.`
            this.battle.push({
                monster: message.monster, 
                you: message.you
            })
            this.points = this.points + (monsterInjured * 10)
            this.monsterPoints = this.monsterPoints + (youInjured * 10)
            this.flashHitPoints()
        },
        specialAttack: function(event){
            if (this.monsterHitPoints === 0) {
                this.battle.push({
                    monster: ``, 
                    you: "You've already defeated the monster!"
                })
                return
            }
            let youInjured;
            let monsterInjured

            if (this.monsterType === 'Orc'){
                youInjured = getRandomInt(10);
            } else if (this.monsterType === 'Troll') {
                youInjured = getRandomInt(20);
            } else if (this.monsterType === 'Black Dragon') {
                youInjured = getRandomInt(30);
            } else if (this.monsterType === 'Platinum Dragon') {
                youInjured = getRandomInt(50);
            } else if (this.monsterType === 'MindFlayer') {
                youInjured = getRandomInt(60);
            } else {
                youInjured = getRandomInt(50);
            }
            
            if (this.characterClass === 'Warrior') {
                monsterInjured = getRandomInt(50);
            } else monsterInjured = getRandomInt(30);

            this.you = this.you - youInjured;
            this.monsterHitPoints = this.monsterHitPoints - monsterInjured;
            this.battle.push({
                monster: `${this.characterClass} hits ${this.monsterType} for ${monsterInjured} hit points of damage.`, 
                you: `${this.monsterType} hits ${this.characterClass} for ${youInjured} hit points of damage.`
            })
            this.points = this.points + (monsterInjured * 10)
            this.monsterPoints = this.monsterPoints + (monsterPoints * 10)
        },
        heal: function(event){
            let healed;
            let healMessage;
            if (this.characterClass === 'Paladin') {
                healed = getRandomInt(40);
            } else healed = getRandomInt(20);
            // prevent player from healing themself above 100 hitpoints
            if (healed === 0) {
                healMessage = `Healing completely failed!`
            } else if (this.you + healed < 100 && this.you + healed >= 1) {
                healMessage = `You heal yourself for ${healed} hit points.`
            } else if (this.you + healed >= 100) {
                healMessage = `You are at perfect health!`
            }
            this.you = this.you + healed < 100 ? this.you + healed : 100;
            this.battle.push({
                monster: ``, 
                you: healMessage
            })
            if (this.characterClass === 'Paladin') {
                this.points = this.points - Math.floor(healed * 2)
            } else  this.points = this.points - Math.floor(healed * 6)
        },
        flashHitPoints: function () {
            this.monsterBackgroundColor = 'red'
            let vm = this
            setTimeout(vm.monsterBackgroundColor = 'green', 2000)
            //this.monsterBackgroundColor = 'green'
          }
    },
    watch: {
        you: function(){
            if (this.you < 1){
                this.you = 0
                this.gameOver = true
                this.highScores.push({name: this.name, points: this.points})
            }
        },
        monsterHitPoints: function(){
            if (this.monsterHitPoints < 1){
                this.monsterHitPoints = 0
                this.alert = true
                this.gameOver = true  
            }
        }
    },
    computed: {
        computedBackgroundColor: function () {
          return this.monsterBackgroundColor;
        }
      },

})