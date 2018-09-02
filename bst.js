class Node {
    constructor(key, parent = null, leftChild = null, rightChild = null) {
        this.key = key;
        this.parent = parent;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
    //revisar
    find(key) {
        if (this.key == key) {
            return this;
            console.log("nó achado");
        } else {
            if (key < this.key) {
                if (this.leftChild !== null) {
                    return this.leftChild.find(key);
                } else {
                    return null;
                }
            } else {
                if (this.rightChild !== null) {
                    return this.rightChild.find(key);

                } else {
                    return null;

                }
            }
        }
        // return this;
    }
    //revisar
    add(node) {
        if (node.key < this.key) {
            if (this.leftChild == null) {
                this.leftChild = node;
                //aqui recebe a raiz this representa o node inteiro    
                this.leftChild.parent = this;
            }
            else this.leftChild.add(node);
        } else {
            if (this.rightChild == null) {
                this.rightChild = node;
                node.parent = this;
            }
            else this.rightChild.add(node);
        }
    }

    remove(key) {
        let found = this.find(key);

        if (found !== null) {
            if (found.isLeaf()) {
                if (found.isLeftChild()) {
                    found.parent.leftChild = null;
                } else {
                    found.parent.rightChild = null;
                }

                found.parent = null;
            } else if (found.hasBothChildren()) {
                let sucessor;
                if (found.parent == null) {
                    if (found.leftChild.size() >= found.rightChild.size()) {
                        sucessor = found.leftChild.max();
                        sucessor.leftChild = found.leftChild;
                        sucessor.rightChild = found.rightChild;
                        sucessor.parent = null;
                        found.leftChild = null;
                        found.rightChild = null;
                    } else {
                        sucessor = found.rightChild.min();
                        sucessor.rightChild = found.rightChild;
                        sucessor.leftChild = found.leftChild;
                        sucessor.parent = null;
                        found.leftChild = null;
                        found.rightChild = null;
                    }
                }
                else {
                    if (found.isLeftChild()) {
                        if (found.leftChild.size() >= found.rightChild.size()) {
                            sucessor = found.leftChild.max();
                            found.parent.leftChild = sucessor;
                            sucessor.rightChild = found.rightChild;
                            sucessor.parent = found.parent;
                            found.leftChild = null;

                        }
                        else {
                            sucessor = found.rightChild.min();
                            found.parent.leftChild = sucessor;
                            sucessor.leftChild = found.leftChild;
                            sucessor.parent = found.parent;
                            found.rightChild = null;
                        }
                    } else {
                        if (found.leftChild.size() >= found.rightChild.size()) {
                            sucessor = found.leftChild.max();
                            found.parent.rightChild = sucessor;
                            sucessor.rightChild = found.rightChild;
                            sucessor.parent = found.parent;
                            found.leftChild = null;
                        } else {
                            sucessor = found.rightChild.min();
                            found.parent.rightChild = sucessor;
                            sucessor.rightChild = found.rightChild;
                            sucessor.leftChild = found.leftChild;
                            sucessor.parent = found.parent;
                            found.rightChild = null;
                        }
                    }
                }
            } else {
                if (found.isLeftChild()) {
                    if (found.hasLeftChild()) {
                        found.parent.leftChild = found.leftChild;
                        found.leftChild.parent = found.parent;
                        found.leftChild = null;

                    } else {
                        found.parent.rightChild = found.rightChild;
                        found.rightChild.parent = found.parent;
                        found.rightChild = null;
                    }
                    //verificar se esse if e necessario
                } else {
                    if (found.hasLeftChild()) {
                        found.parent.leftChild = found.leftChild;
                        found.leftChild.parent = found.parent;
                        found.leftChild = null;
                    } else {
                        found.parent.rightChild = found.rightChild;
                        found.rightChild.parent = found.parent;
                        found.rightChild = null;
                    }
                }


            }

            found.parent = null;
            console.log("removido com sucesso");
        } else {
            console.log("O no nao esta na arvore");
        }

    }


    inOrder() {
        if (this.leftChild !== null) {
            this.leftChild.inOrder();

        }
        console.log(this.key);
        if (this.rightChild !== null) {
            this.rightChild.inOrder();
        }

    }
    //correto
    preOrder() {
        console.log(this.key);
        if (this.leftChild !== null) {
            this.leftChild.preOrder();
        }
        if (this.rightChild !== null) {
            this.rightChild.preOrder();
        }
    }
    //correto
    posOrder() {
        if (this.leftChild !== null) {
            this.leftChild.posOrder();
        }
        if (this.rightChild !== null) {
            this.rightChild.posOrder();
        }
        console.log(this.key);
    }
    //correto
    hasLeftChild() {
        return this.leftChild !== null;
    }
    //correto
    hasRightChild() {
        return this.rightChild !== null;
    }

    isLeftChild() {
        return (this.parent !== null && this.parent.leftChild !== null);
    }

    isRightChild() {
        return (this.parent !== null && this.parent.rightChild !== null);
    }
    //correto
    hasBothChildren() {
        return (this.leftChild !== null && this.rightChild !== null);
    }
    //correto
    isLeaf() {
        return (this.leftChild == null && this.rightChild == null);
    }
    //revisar
    minimum() {
        let min = this;
        while (min.hasLeftChild()) {
            min = min.leftChild;
        }
        return min;
    }
    //revisar
    maximum() {
        let max = this;
        while (max.hasRightChild()) {
            max = max.rightChild;
        }
        return max;
    }
    //correto
    size() {
        //ja se assume que começa com 1 para evitar paradoxos
        let total = 1;

        if (this.leftChild !== null) {
            total = total + this.leftChild.size();
        }
        if (this.rightChild !== null) {
            total = total + this.rightChild.size();
        }
        return total;
    }

    //correto
    sum() {
        let soma = this.key;

        if (this.leftChild !== null) {
            soma = soma + this.leftChild.sum();
            5
        }
        if (this.rightChild !== null) {
            soma = soma + this.rightChild.sum();
        }


        return soma;
    }

}

const key = [10, 7, 18, 9, 3, 8, 1, 11];

let root = null;
for (let i = 0; i < key.length; i++) {
    if (root == null) {
        root = new Node(key[i]);
    } else {
        root.add(new Node(key[i]));

    }
}

//let foundit = root.find(11);
//root.add = new Node(30);
console.log(root.size());

console.log(root.sum());

console.log(root.find(30));

console.log(root.remove(50));
