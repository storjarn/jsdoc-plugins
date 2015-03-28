
exports.handlers = {
	beforeParse: function(e) {
		console.log(e.filename);
	},
    processingComplete: function(e) {
        // Do something when we see a new doclet
        var index = {};
        var items = [];
        var i = 0;
        var doclet = null;
        var namespace = '';
        var itemName = '';
        var parent = null;

        function addItem() {
        	parent[itemName] = {
        		link: doclet.longname + ".html"
        	};
        }

        for(i = 0; i < e.doclets.length; ++i) {
        	doclet = e.doclets[i];
        	namespace = doclet.longname.split(".");
    		itemName = namespace.pop();
    		namespace = namespace.join(".");
        	if (doclet.kind == "namespace" || doclet.kind == "class") {
        		items.push(doclet);
        	}
        }

        items.sort(function(a, b) {
        	return a.longname.localeCompare(b.longname);
        	// return a.localeCompare(b);
        });

        for(i = 0; i < items.length; ++i) {

        	doclet = items[i];
        	namespace = doclet.longname.split(".");
    		itemName = namespace.pop();
    		namespace = namespace.join(".");
    		parent = index;
        	if (!!namespace) {
        		var parts = namespace.split(".");
        		for(var j = 0; j < parts.length; ++j) {
        			parent = parent[parts[j]];
        		}
        	}

        	if (doclet.kind == "namespace" || doclet.kind == "class") {
        		addItem();
        	}
        }

        // console.log(JSON.stringify(index, null, 4));
        console.log(JSON.stringify(index));
    }
};
