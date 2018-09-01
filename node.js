class Node{
    constructor(key, parent = null, leftChild = null, rightChild = null){
        this.key = key;
        this.parent = parent;
        this.leftChild = leftChild;
        this.rightChild = rightChild;

    }


  hasLeftChild(){
        return this.leftChild != null;
    }

  hasRightChild(){
        return this.rightChild != null;
    }

    add(node){
        if(node.key < this.key){
            if(this.hasLeftChild()){
                this.leftChild.add(node);
            }

            else {
                this.leftChild = node;
                this.leftChild.parent = this;
            }

        }

        else {
            if(node.key > this.key){
                if(this.hasRightChild()){
                    this.rightChild.add(node);
                }

                else {
                    this.rightChild = node;
                    this.rightChild.parent = this;
                }

            }

        }

    }


    let root = new Node(10);

    console.log(root.hasLeftChild());
    root.add(new Node(7));
    root.add(new Node(13));
    root.add(new Node(6));
    root.add(new Node(12));
    root.add(new Node(15));

    console.log(root);

    console.log(root.leftChild);    
