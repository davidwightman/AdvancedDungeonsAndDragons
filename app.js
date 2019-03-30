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
           
            let youInjured = getRandomInt(10);
            let monsterInjured = getRandomInt(20);
            this.you = this.you - youInjured;
            this.monsterHitPoints = this.monsterHitPoints - monsterInjured;
            this.battle.push({
                monster: `${this.characterClass} hits ${this.monsterType} for ${monsterInjured} hit points of damage.`, 
                you: `${this.monsterType} hits ${this.characterClass} for ${youInjured} hit points of damage.`
            })
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
            if (this.characterClass === 'Paladin') {
            healed = getRandomInt(40);
            } else healed = getRandomInt(20);
            this.you = this.you + healed;
            this.battle.push({
                monster: ``, 
                you: `You heal yourself for ${healed} hit points.`
            })
        }
    },
    watch: {
        you: function(){
            if (this.you < 1){
                alert('the monster defeated you')
                this.giveup()
            }
        },
        monsterHitPoints: function(){
            if (this.monsterHitPoints < 1){
                alert('you win! you beat the monster')
                this.giveUp()
            }
        }
    }

})