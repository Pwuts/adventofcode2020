const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const rawBagSpecs = input.split('\n');

const targetBagColor = 'shiny gold';

const bagSpecs = rawBagSpecs.map(bagSpecString => {
    let { color, children } =
        /(?<color>[a-z]+ [a-z]+) bags contain (?:(?<children>(?:\d+ [a-z]+ [a-z]+ bags?(?:, )?)+)|no other bags)\./.exec(bagSpecString).groups;

    // convert children to objects if present
    children = (children?.split(', ') ?? [])
                        .map(childBag => /(?<amount>\d+) (?<color>[a-z]+ [a-z]+) bags?/.exec(childBag).groups);

    children.forEach(childObj => childObj.amount = Number(childObj.amount));

    return {
        color,
        children,
    }
})
.map((bag, _index, bagSpecs) => {   // find possible direct parents of bag
    bag.possibleParents = bagSpecs.filter(bagSpec => {
        return bagSpec.children.some(child => child.color == bag.color)
    });
    return bag;
});

const targetBag = bagSpecs.find(bag => bag.color == targetBagColor);


/*** part 1 ***/
const allPossibleParents = (function (bagToInspect) // find all possible (in)direct parents of bag
{
    let allPossibleParents = [];

    function recursiveSearchParents(bag, totalParentList)
    {
        bag.possibleParents.forEach(parent => {
            if (!totalParentList.includes(parent)) totalParentList.push(parent);

            recursiveSearchParents(parent, totalParentList);
        })
    }

    recursiveSearchParents(bagToInspect, allPossibleParents);

    return allPossibleParents;
})(targetBag);

console.log(`[part 1] total number of bags which can (in)directly contain a "${targetBag.color}" bag:`, allPossibleParents.length);


/*** part 2 ***/
bagSpecs.forEach(bagSpec =>
    bagSpec.children = bagSpec.children?.map(child => ({
        amount: child.amount,
        spec: bagSpecs.find(bag => bag.color == child.color),
    }))
);

const totalChildBags = (function recursiveCountChildren(bag) // find all possible (in)direct parents of bag
{
    return bag.children.reduce(
        (total, childBag) => {
            return total + childBag.amount * (1 + recursiveCountChildren(childBag.spec))
        },
        0
    );
})(targetBag);

console.log(`[part 2] total number of bags required in a "${targetBag.color}" bag:`, totalChildBags);
