function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

new Vue({
    el: '#app',
    data: {
        playingGame: false,
        you: 100,
        monster: 100,
        battle: [],
        characterClass: '',
        characterImage: ''
    },
    methods: {
        startGame: function(event){
            console.log(event)
            this.playingGame = !this.playingGame;
            if (event === 'paladin') {
                this.characterClass = 'paladin'
                this.characterImage = 'paladin.jpg'
            } else {
                this.characterClass = 'warrior'
                this.characterImage = 'warrior.jpg'
            }
        },
        giveUp: function(event){
            this.you = 100;
            this.monster = 100;
            this.battle = []
            this.playingGame = !this.playingGame;
        },
        attack: function(event){
           
            let youInjured = getRandomInt(10);
            let monsterInjured = getRandomInt(20);
            this.you = this.you - youInjured;
            this.monster = this.monster - monsterInjured;
            this.battle.push({
                monster: `Player hits monster for ${monsterInjured} hit points of damage.`, 
                you: `Monster hits player for ${youInjured} hit points of damage.`
            })
        },
        specialAttack: function(event){
            let youInjured;
            if (this.characterClass === 'warrior') {
                youInjured = getRandomInt(20);
            } else youInjured= getRandomInt(10);
            let monsterInjured = getRandomInt(40);
            this.you = this.you - youInjured;
            this.monster = this.monster - monsterInjured;
            this.battle.push({
                monster: `Player hits monster for ${monsterInjured} hit points of damage.`, 
                you: `Monster hits player for ${youInjured} hit points of damage.`
            })
        },
        heal: function(event){
            let healed;
            if (this.characterClass === 'paladin') {
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
            if (this.you <= 0){
                alert('the monster defeated you')
                this.giveup()
            }
        },
        monster: function(){
            if (this.monster <= 0){
                alert('you win! you beat the monster')
                this.giveUp()
            }
        }
    }

})