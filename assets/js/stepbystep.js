
function stepbystep(nodess, edgess){
    this.marqueurGauche = "      < < < < <      ";
    this.marqueurDroit = "      > > > > >";
    this.nodes = nodess.get({
                              fields: ['id', 'label'],
                            });

    this.edges = edgess.get({
                              fields: ['from', 'to', 'label'],
                            });;
    this.currentNode = null;
}

stepbystep.prototype = {
	    constructor: stepbystep,
        next:function(currentInst, node){
          var newLabel ="";
          var addrGDB = parseInt(currentInst, 16);
          var instruction = node.label.split("\n");
          for(var i=0; i<instruction.length; i++){
            var addr = this.getAddressInstruction(instruction[i]);
            if(addr == addrGDB){
                instruction[i] = this.marqueurGauche + instruction[i]+ this.marqueurDroit;
            }
            newLabel = newLabel + instruction[i] + "\n";
          }
          return newLabel;
        },
        
        findNode:function(instruction){
            var addrGDB = parseInt(instruction, 16);
            for(var i = 0; i<this.nodes.length;i++){
                var array = this.nodes[i].label.split("\n");
                for(var k = 0; k<array.length; k++){
                    var curInst = array[k];
                    var addr = this.getAddressInstruction(curInst);
                    if(addr == addrGDB){
                        return this.nodes[i];
                    }   
                }
            }  
        },
        
        
        getAddressInstruction:function(stringInstruction){
                stringInstruction = stringInstruction.replace("(", "/");
                stringInstruction = stringInstruction.replace(")", "/");
                var inst = stringInstruction.split("/"); //le format d'adresse utilisé par gdb est à l'index 1
                var addr = parseInt(inst[1], 16);
                return addr;
        },
        
        getInstructionsArray:function(){
           var node = this.nodes[this.index_node].label;
           var instArray = node.split("\n");
           return instArray;
        },
        
        getInstructionsArrayFromNode:function(node){
            return node.label.split("\n");
        },
        
      
        
        
}

/*function nodeList(nodes){
    var array = [];
    for(var node in nodes){
        array[node.id] = node.label;
    }
}*/
