const ItemList = [
    {
        id:1,
        name:"dummy1",
        price:123,
        category:"cat1",
        subItems: [
            {
                id:2,
                name:"dummy2",
                price:123,
                category:"cat3"
            },
            {
                id:3,
                name:"dummy3",
                price:123,
                category:"cat1"
            }
        ],
    },
    {
        id:2,
        name:"dummy2",
        price:123,
        category:"cat3"
    },
    {
        id:3,
        name:"dummy3",
        price:123,
        category:"cat1"
    },
    {
        id:4,
        name:"dummy4",
        price:123,
        category:"cat2"
    },
    {
        id:5,
        name:"dummy5",
        price:123,
        category:"cat1"
    },
    {
        id:6,
        name:"dummy6",
        price:123,
        category:"cat2"
    }
]

const RequirementList = [
    {
        id: 1,
        name: "req1",
        quantity: 4,
        qualityGrade: "GOOD"
    },
    {
        id: 2,
        name: "req2",
        quantity: 2,
        qualityGrade: "GOOD"
    },
    {
        id: 3,
        name: "req3",
        quantity: 4,
        qualityGrade: "BAD"
    },
]

module.exports = {ItemList, RequirementList};