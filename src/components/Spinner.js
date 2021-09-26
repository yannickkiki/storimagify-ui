import React from "react";

class Spinner extends React.Component{

    /** Constructor*/

    constructor(props) {
        super(props);
        this.state = {};
    }

    /** End constructor*/


    /** Methods*/

    //Life cycle
    componentDidMount() {
    }

    //Setters


    //Getters


    //Helpers


    //Events


    /** End methods*/


    /** Render*/

    render() {

        const style = `
            div.spinner div {
            width: 4%;
            height: 14%;
            background: #718096;
            position: absolute;
            left: 49%;
            top: 43%;
            opacity: 0;
            -webkit-border-radius: 50px;
            -webkit-box-shadow: 0 0 3px rgba(0,0,0,0.2);
            -webkit-animation: fade 1s linear infinite;
            }
            
            @-webkit-keyframes fade {
            from {opacity: 1;}
            to {opacity: 0.25;}
            }
            
            div.spinner div.bar1 {
            -webkit-transform:rotate(0deg) translate(0, -130%);
            -webkit-animation-delay: 0s;
            }    
            
            div.spinner div.bar2 {
            -webkit-transform:rotate(30deg) translate(0, -130%); 
            -webkit-animation-delay: -0.9167s;
            }
            
            div.spinner div.bar3 {
            -webkit-transform:rotate(60deg) translate(0, -130%); 
            -webkit-animation-delay: -0.833s;
            }
            div.spinner div.bar4 {
            -webkit-transform:rotate(90deg) translate(0, -130%); 
            -webkit-animation-delay: -0.7497s;
            }
            div.spinner div.bar5 {
            -webkit-transform:rotate(120deg) translate(0, -130%); 
            -webkit-animation-delay: -0.667s;
            }
            div.spinner div.bar6 {
            -webkit-transform:rotate(150deg) translate(0, -130%); 
            -webkit-animation-delay: -0.5837s;
            }
            div.spinner div.bar7 {
            -webkit-transform:rotate(180deg) translate(0, -130%); 
            -webkit-animation-delay: -0.5s;
            }
            div.spinner div.bar8 {
            -webkit-transform:rotate(210deg) translate(0, -130%); 
            -webkit-animation-delay: -0.4167s;
            }
            div.spinner div.bar9 {
            -webkit-transform:rotate(240deg) translate(0, -130%); 
            -webkit-animation-delay: -0.333s;
            }
            div.spinner div.bar10 {
            -webkit-transform:rotate(270deg) translate(0, -130%); 
            -webkit-animation-delay: -0.2497s;
            }
            div.spinner div.bar11 {
            -webkit-transform:rotate(300deg) translate(0, -130%); 
            -webkit-animation-delay: -0.167s;
            }
            div.spinner div.bar12 {
            -webkit-transform:rotate(330deg) translate(0, -130%); 
            -webkit-animation-delay: -0.0833s;
            }
        `;

        return (
            <React.Fragment>
                <style>{style}</style>
                <div className="h-screen w-screen z-40 bg-black opacity-25 fixed top-0"/>
                <div className="flex flex-col justify-center items-center fixed z-50" style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <div className="spinner h-16 w-16 relative">
                        <div className="bar1"/>
                        <div className="bar2"/>
                        <div className="bar3"/>
                        <div className="bar4"/>
                        <div className="bar5"/>
                        <div className="bar6"/>
                        <div className="bar7"/>
                        <div className="bar8"/>
                        <div className="bar9"/>
                        <div className="bar10"/>
                        <div className="bar11"/>
                        <div className="bar12"/>
                    </div>
                </div>
            </React.Fragment>
        );

    }

    /** End render*/
}

export default Spinner;
