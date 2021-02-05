import Starship from "./Starship";

export default class StarWarsUniverse{
    constructor(){
        this.starships = [];
    }

    async init(){
        const count = await this._getStarshipCount();
        // console.log(count);
        await this._createStarships();
        console.log(await this.theBestStarship());
    }

    async _getStarshipCount(){
        var response = await fetch('https://swapi.booost.bg/api/starships?page=1');
        var data = await response.json();
        return data.count;
    }

    async _createStarships(){
        const arr = [];
        for(var i = 1;i<=36;i++){
        var  response = await fetch('https://swapi.booost.bg/api/starships/' + i + '/');
            if(response.ok){
                var data = await response.json();
                    if(this._validateData(data.consumables, data.passengers)){
                    const rawDataConsumable = (data.consumables).split(' ');
                    var resConsumable;
                    var clearPassengers = (data.passengers).replace(',', '')
                    var resPassengers = parseInt(clearPassengers);
                    switch (rawDataConsumable[1]) {
                        case "year":
                            resConsumable = 365;

                            break;
                        case "years":
                            var parsedValue = parseInt(rawDataConsumable[0]);
                            resConsumable = parsedValue*365;
                            break;
                    
                        case "month":
                            resConsumable = 30;
                            break;
                        case "months":
                            var parsedValue = parseInt(rawDataConsumable[0]);
                            resConsumable = parsedValue*30;
                            break;

                        case "week":
                            resConsumable = 7;
                            break;
                        case "weeks":
                            var parsedValue = parseInt(rawDataConsumable[0]);
                            resConsumable = parsedValue*7;
                            break;

                        case "day":
                            resConsumable = 1;
                            break;
                        case "days":
                            resConsumable = parseInt(rawDataConsumable[0]);
                            break;
                            
                        default:
                            break;
                    }
                    const starship = new Starship(data.name, resConsumable, resPassengers);
                    arr.push(starship);
                    }
            }
        }
        this.starships = arr;
        // console.log(this.starships)
    }

    _validateData(consumable, passengers){
        if(consumable == 'undefined' || consumable == 'null' || consumable == 'unknown' || passengers == 'undefined' || passengers == 'null' || passengers == 'n/a' || passengers == '0'){
            return false;
        }
        else{
            return true;
        }
    }

    get theBestStarship(){
        const arr = this.starships;
        var max = 0;
        var maxI = 0;
        for(var i = 0;i<arr.length;i++){
            var temp = arr[i]._consumables / arr[i]._passengers;
            console.log(temp);
            if(temp>max)
            {
                max = temp;
                maxI = i;
            }
        }
        return arr[maxI];
    }
}