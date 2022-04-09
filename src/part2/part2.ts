import * as R from "ramda";
import { pipe } from "ramda";
const stringToArray = R.split("");

/* Question 1 */
export const countLetters: (s: string) => {} = R.pipe(
    stringToArray,
    R.filter(x=>x!=" "),
    R.countBy(R.toLower)
)
/* Question 2 */

const popIfMatch = (stack: string[], openParen: string, closeParen: string): string[] => 
    R.isEmpty(stack) ? [closeParen] : 
    R.head(stack) === openParen ? R.tail(stack) : R.prepend(closeParen, stack); 

const pairReducer = (stack: string[], c: string): string[] => 
    c === "(" || c === "{" || c === "[" ? R.prepend(c, stack) : 
    c === ")" ? popIfMatch(stack, "(", c) : 
    c === "}" ? popIfMatch(stack, "{", c) : 
    c === "]" ? popIfMatch(stack, "[", c) : 
    stack; 

export const isPaired: (s: string) => boolean = R.pipe(
    stringToArray,
    R.reduce(pairReducer, []),
    R.isEmpty
)


/* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

const hasChildren = (tree: WordTree) : boolean =>
    (tree.children!==undefined) && (tree.children!==[]);


const childReducer = (resultStr: string, curr: WordTree): string => 
    resultStr.concat(extractStr(curr))
 
const extractStr = (t: WordTree): string => {
    return (t.root.concat(t.children.reduce(childReducer," ")))
}

//    return hasChildren(t) ? (t.root.concat(t.children.reduce(childReducer," "))) :t.root

export const treeToSentence = (t: WordTree): string => {
    return (extractStr(t)).slice(0,-1);

}
const t1: WordTree = { 
    root: "Hello", 
    children: [ 
    { 
    root: "students", 
    children: [ 
    { 
    root: "how", 
    children: [] 
    } 
    ] 
    }, 
    { 
    root: "are", 
    children: [] 
    }, 
    { 
    root: "you?", 
    children: [] 
    }, 
    ] 
    }
    console.log(treeToSentence(t1))