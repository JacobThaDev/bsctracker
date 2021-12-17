import { Component } from "react";
import { Container } from "react-bootstrap";

export default class Egg extends Component {

    numbers  = [4, 2, 3, 7, 5, 6, 5, 1, 2, 2, 3, 4];
    indexes  = [9, 296, 329, 1219, 1446, 1541, 1552, 2116, 2242, 2402, 2412, 3076];
    eggArr   = [];
    eggCount = 3198;

    componentDidMount() {
        let curIndex  = 0;
        let component = this;

        for (let i = 0; i < this.eggCount; i++) {
            let egg = document.getElementById("egg-"+i);

            if (i != this.indexes[curIndex]) {
                egg.addEventListener("click", function(e) {
                    e.preventDefault();
                    alert("NOPE! Keep looking!");
                });
                continue;
            }

            egg.addEventListener("click", function(e) {
                e.preventDefault();
                let dataKey = egg.dataset.key;

                for( let i = 0; i < component.indexes.length; i++) {
                    if (component.indexes[i] == dataKey) {
                        alert("Pos "+(i+1)+": "+component.numbers[i])
                        break;
                    }
                }
            });

            curIndex++;
        }
    }

    render() {
        let eggArr   = [];
        
        for (let i = 0; i < this.eggCount; i++) {
            eggArr.push(
                <a href="" key={i} id={"egg-"+i} data-key={i}>
                    <i className="fas fa-egg fa-fw fa-lg mb-3"></i>
                </a>
            );
        }

        return(<>

        <Container>
            {eggArr}
        </Container>
       
        </>);
    }
}