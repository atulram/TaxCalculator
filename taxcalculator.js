class TaxCal {
    constructor(gross, _80C=150000, _80D=25000, _80CCD1B=50000){
        this._gross = gross;
        this._80C = _80C;
        this._80D = _80D;
        this._80CCD1B = _80CCD1B;
    }

    setGross = (gross) => {
        this._gross = gross;
    }

    calculateHRA = () => {
        this._HRA = 0.08 * this._gross;
        if(this._HRA > 350000) {
            this._HRA = 350000;
        }
    }

    lessStandardDeduction = () =>{
        if(this._regime === 'NEW' && this._gross < 1550000 ) {
            this._stdDeduction = 0;
        } else {
            this._stdDeduction = 52500;
        }
        
        this.taxable -= this._stdDeduction;
    }

    lessExemptionAndDeduction = () => {
        if(this._regime === 'OLD') {
            this.taxable -= this._HRA;
            this.taxable -= this._80C;
            this.taxable -= this._80CCD1B;
            this.taxable -= this._80D;
        }
    }

    calculateTaxable = () => {
        this.taxable = this._gross;
        this.calculateHRA();
        this.lessStandardDeduction();
        this.lessExemptionAndDeduction();
    }

    calculateTaxBySlab = () => {
        let resultant = this.taxable;
        let cess = 4;
        let tax = 0;
        let amount;
        this.slabs.forEach( slab => {
            if(!slab.width) slab.width = resultant;
            if(resultant > 0){
                amount = Math.min(resultant, slab.width);
                tax = tax + amount*slab.percent/100
                resultant = resultant - amount
            }
        });
        this.tax = tax;
        this.cess = tax*cess/100;
        this.taxPayable = Math.round(tax + this.cess);
    }

    getOldRegimeTax = () => {
        this._regime = 'OLD';
        this.calculateTaxable();
        if(this.taxable <= 500000){
            this.tax = 0;
            this.cess = 0;
            this.taxPayable = 0;
            return this.taxPayable;
        }
        this.slabs = [
            {
                percent:0, 
                width:250000
            }, {
                percent:5, 
                width:250000
            }, {
                percent:20, 
                width:500000
            },{
                percent:30, 
                width:null
            }
        ];
        this.calculateTaxBySlab();
        return this.taxPayable;
    }
    
    getNewRegimeTax = () => {
        this._regime = 'NEW';
        this.calculateTaxable();
        if(this.taxable <= 700000){
            this.tax = 0;
            this.cess = 0;
            this.taxPayable = 0;
            return this.taxPayable;
        }
        this.slabs = [
            {
                percent:0, 
                width:300000
            }, {
                percent:5, 
                width:300000
            }, {
                percent:10, 
                width:300000
            }, {
                percent:15, 
                width:300000
            }, {
                percent:20, 
                width:300000
            }, {
                percent:30, 
                width:null
            }
        ];
        this.calculateTaxBySlab();
        return this.taxPayable;
    }
}
export default TaxCal;

// let gross = Number(process.argv[2]);
// let taxCal = new TaxCal()
// taxCal.setGross(gross);
// console.log(taxCal.getOldRegimeTax());
// console.log(taxCal)
// console.log(taxCal.getNewRegimeTax());
// console.log(taxCal)