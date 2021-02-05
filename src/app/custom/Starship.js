export default class Starship{
    constructor(name, _consumables, _passengers){
        this.name = name;
        this._consumables = _consumables;
        this._passengers = _passengers;
    }

    get maxDaysInSpace(){
        var consumables = parseInt(this._consumables);
        var passengers = parseInt(this._passengers);
        var res = consumables/passengers;
        return res;
    }
}