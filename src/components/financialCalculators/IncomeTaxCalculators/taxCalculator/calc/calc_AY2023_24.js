export function calculateNetIncomeTaxIndividual2324(income) {
    if (income <= 500000) {
        return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 1000000) {
        let tax = (income - 500000) * 0.2 + 12500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income >= 1000000 && income <= 5000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let eduCess = tax * 0.04;
        return { taxRate: tax, surcharge: 0, educationCess: eduCess };
    } else if (income > 5000000 && income <= 10000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let sCharge = tax * 0.1;
        let eduCess = (tax + sCharge) * 0.04;
        return { taxRate: tax, surcharge: sCharge, educationCess: eduCess };
    } else if (income > 10000000 && income <= 20000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let sCharge = tax * 0.15;
        let eduCess = (tax + sCharge) * 0.04;
        return { taxRate: tax, surcharge: sCharge, educationCess: eduCess };
    } else if (income > 20000000 && income <= 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let sCharge = tax * 0.25;
        let eduCess = (tax + sCharge) * 0.04;
        return { taxRate: tax, surcharge: sCharge, educationCess: eduCess };
    } else if (income > 50000000) {
        let tax = (income - 1000000) * 0.3 + 112500;
        let sCharge = tax * 0.37;
        let eduCess = (tax + sCharge) * 0.04;
        return { taxRate: tax, surcharge: sCharge, educationCess: eduCess };
    }
}


// Huf - for ay23-24

export function calculateHUF2324(income){
   if (income <= 250000) {
    return { taxRate: 0, surcharge: 0, educationCess: 0 };
    } else if (income <= 500000) {
       let taxableValue = (income - 250000) * 0.05;
       let eduCess = taxableValue * 0.04; // 5% for the amount above 250,000
        return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
    } else if (income <= 1000000) {
        let taxableValue = (income - 500000) * 0.2 + 12500; // 20% for the amount above 500,000
        let eduCess = taxableValue * 0.04; 
        return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
    } else {
        let  taxableValue = (income - 1000000) * 0.3 + 112500; // 30% for the amount above 1,000,000
        let eduCess = taxableValue * 0.04; 
        return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
    }   
}


// AOP/BOI - for ay23-24

export function calculateAOP_BOI2324(income){
    if (income <= 250000) {
     return { taxRate: 0, surcharge: 0, educationCess: 0 };
     } else if (income <= 500000) {
        let taxableValue = (income - 250000) * 0.05;
        let eduCess = taxableValue * 0.04; // 5% for the amount above 250,000
         return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
     } else if (income <= 1000000) {
         let taxableValue = (income - 500000) * 0.2 + 12500; // 20% for the amount above 500,000
         let eduCess = taxableValue * 0.04; 
         return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
     } else {
         let  taxableValue = (income - 1000000) * 0.3 + 112500; // 30% for the amount above 1,000,000
         let eduCess = taxableValue * 0.04; 
         return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
     }   
 }
 
 // Domestic Company - for ay23-24

export function calculateDcomapny2324(income){
    if (income <= 10000000) {
        let taxableValue = income * 0.3;
     return { taxRate: taxableValue, surcharge: 0, educationCess: 0 };
     } else if (income >= 10000000 && income <=100000000) {
        let taxableValue = income * 0.3;   
        let sCharge = taxableValue * 0.07; 
        let eduCess = (taxableValue+sCharge) * 0.04; 

         return { taxRate: taxableValue, surcharge: sCharge, educationCess: eduCess };
     } else if (income >= 100000000) {
        let taxableValue = income * 0.3;   
        let sCharge = taxableValue * 0.12; 
        let eduCess = (taxableValue+sCharge) * 0.04; 
         return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
     } 
 }

  // Foreign Company - for ay23-24

export function calculateFcomapny2324(income){
    if (income <= 10000000) {
        let taxableValue = income * 0.4;
     return { taxRate: taxableValue, surcharge: 0, educationCess: 0 };
     } else if (income >= 10000000 && income <=100000000) {
        let taxableValue = income * 0.4;   
        let sCharge = taxableValue * 0.02; 
        let eduCess = (taxableValue+sCharge) * 0.04; 

         return { taxRate: taxableValue, surcharge: sCharge, educationCess: eduCess };
     } else if (income >= 100000000) {
        let taxableValue = income * 0.4;   
        let sCharge = taxableValue * 0.05; 
        let eduCess = (taxableValue+sCharge) * 0.04; 
         return { taxRate: taxableValue, surcharge: 0, educationCess: eduCess };
     } 
 }

  // Firm/LLP - for ay23-24

export function calculateFirmLLP2324(income){
    if (income <= 10000000) {
        let taxableValue = income * 0.3;
     return { taxRate: taxableValue, surcharge: 0, educationCess: 0 };
     } else if (income >= 10000000) {
        let taxableValue = income * 0.3;   
        let sCharge = taxableValue * 0.12; 
        let eduCess = (taxableValue+sCharge) * 0.04; 

         return { taxRate: taxableValue, surcharge: sCharge, educationCess: eduCess };
     } 
 }
