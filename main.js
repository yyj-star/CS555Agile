const fs = require('fs')
const readline = require('readline');

async function processByLine(){
    const fileStream = fs.createReadStream('GEDCOM.ged');
    const rl = readline.createInterface({
        input:fileStream,
        crlfDelay:Infinity
    });
    for await (const line of rl){
        
        console.log(`--> ${line}`); 
        const lineSplit = line.split(' ');
        
        var valid = ""; 
        var tag= ""; 
        tag = lineSplit[1];
        if(tag.includes("@")){
            tag = lineSplit[2];
        }

        if(tag == "INDI" || tag == "NAME" || tag == "SEX"|| tag == "BIRT"|| tag == "DEAT"|| tag == "FAMC"|| tag == "FAMS"|| tag == "FAM"|| tag == "MARR"|| tag == "HUSB"|| tag == "WIFE"
        || tag == "CHIL" || tag == "DIV"|| tag == "DATE"|| tag == "HEAD"|| tag == "TRLR"|| tag == "NOTE"){
            valid = "Y"; 
        }else{
            valid = "N";
        }
        
        
        if(lineSplit.length >= 3){
            let concat = "";
            for(i = 2; i<lineSplit.length;i++){
                 concat = concat + lineSplit[i] + " "; 
            }
            lineSplit[2] = concat;

            console.log(`<--|${lineSplit[0]}|${lineSplit[1]}|${valid}|${lineSplit[2]}`);
        }else{
            console.log(`<--|${lineSplit[0]}|${lineSplit[1]}|${valid}`);
        }

    }
}

processByLine();