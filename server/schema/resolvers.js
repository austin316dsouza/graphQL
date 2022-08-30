const {ItemList, RequirementList} = require("../DummyData");
const _ = require("lodash");
const resolvers = {
    Query: {
        items:() => {
            return ItemList;
        },
        item: (parent,args) => {
            const id = Number(args.id)
            const item = _.find(ItemList, {id})
            return item;
        },
        requirements:() => {
            return RequirementList;
        }

    },
    Item: {
        requirements: () => {
            // return _.filter(RequirementList,(requirement) => requirement.qualityGrade == "BAD")
            return _.filter(RequirementList,(requirement) => requirement.quantity > 2)
        }
    },

    //MUTATION RESOLVER
    Mutation: {
        createItem: (parent,args) => {
            const item = args.input;
            const lastId = ItemList[ItemList.length -1].id;
            item.id = lastId+1;
            ItemList.push(item);
            return item;
        },
        updateItemname: (parent,args) => {
            const {id,newName} = args.input;
            let updatedItem;
            ItemList.forEach((item)=>{
                if(item.id === Number(id))
                {
                    item.name = newName;
                    updatedItem = item;
                }
            });
            return updatedItem;

        },

        deleteItem: (parent,args) => {
            const id = Number(args.id);
            _.remove(ItemList, (item) => item.id == id);
            return null;
        }
    }

}

module.exports = {resolvers};