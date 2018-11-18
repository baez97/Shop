var Messages = {errors:[], infos:[]}

Messages.pushError = function (message) { 
    Messages.messages.push({ message: message }); 
}

Messages.error = function (message) { 
    if ( message ){ // Push 
        Messages.errors.push({ message: message }); 
        return message;
    } else {        // Pop
        var result = Messages.errors;
        Messages.errors = [];
        return result;
    }
}

Messages.info = function (message) { 
    if ( message ) { // Push 
        Messages.infos.push({ message: message }); 
    } else {         // Pop
        var result = Messages.infos; Messages.infos = [];
        return result;
    }
}

Messages.all = function () {
    var result    = {};
    result.errors = Messages.error(); 
    result.infos  = Messages.info(); 
    return result;
}
