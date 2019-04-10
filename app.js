function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

new Vue({
    el: '#app',
    data: {
        monsterTypes: [
            {name: 'Orc', image: 'orc.jpg', hitPoints: 50, divideBy: .5},
            {name: 'Troll', image: 'troll.jpg', hitPoints:200, divideBy: 2},
            {name: 'Eye Of The Beholder', image: 'eyeOfTheBeholder.jpg', hitPoints: 25, divideBy: .25}],
        playingGame: false,
        you: 100,
        monsterHitPoints: undefined,
        battle: [],
        characterClass: '',
        characterImage: '',
        monsterImage: '',
        monsterType: '',
        monsterDivideHitPoints: '',
        backgroundColor1: '#eee',
        gameOver: false,
        alert: false
    },
    methods: {
        startGame: function(event){
            console.log(event)
            this.playingGame = !this.playingGame;
            if (event === 'Paladin') {
                this.characterClass = 'Paladin'
                this.characterImage = 'paladin.jpg'
            } else {
                this.characterClass = 'Warrior'
                this.characterImage = 'warrior.jpg'
            }
            let monsterSelector = getRandomInt(3)
            this.monsterType = this.monsterTypes[monsterSelector].name
            this.monsterImage = this.monsterTypes[monsterSelector].image
            this.monsterHitPoints = this.monsterTypes[monsterSelector].hitPoints
            this.monsterDivideHitPoints = this.monsterTypes[monsterSelector].divideBy
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
        },
        attack: function(event){
            let message = {}
            let youInjured = getRandomInt(10);
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
            // if (youInjured !== 0){
            //     setTimeout(()=>{
            //         this.backgroundColor1 = 'red'
            //       }, 250)
            //     }
            // }
        },
        specialAttack: function(event){
            let youInjured;
            if (this.characterClass === 'Warrior') {
                youInjured = getRandomInt(20);
            } else youInjured= getRandomInt(10);
            let monsterInjured = getRandomInt(40);
            this.you = this.you - youInjured;
            this.monsterHitPoints = this.monsterHitPoints - monsterInjured;
            this.battle.push({
                monster: `${this.characterClass} hits ${this.monsterType} for ${monsterInjured} hit points of damage.`, 
                you: `${this.monsterType} hits ${this.characterClass} for ${youInjured} hit points of damage.`
            })
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
        }
    },
    watch: {
        you: function(){
            if (this.you < 1){
                this.you = 0
                this.gameOver = true
            }
        },
        monsterHitPoints: function(){
            if (this.monsterHitPoints < 1){
                this.monsterHitPoints = 0
                this.alert = true
            }
        }
    }

})