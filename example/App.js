import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button, Image } from 'react-native';

export default class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
  gameState:
  [ [  0, 0 , 0 ],
    [  0, 0 , 0 ],
    [  0, 0 , 0 ]
  ],
  currentPlayer: 1,
  }
}

componentDidMount(){
  this.initializeGame();
}

initializeGame = () => {
  this.setState({ gameState:

  [ [  0, 0 , 0 ],
    [  0, 0 , 0 ],
    [  0, 0 , 0 ]
  ],
  currentPlayer: 1,
  });
}

getWinner = () => {
  const NUM_TILES = 3; 
  var arr = this.state.gameState;
  var sum;


  for ( var i = 0; i<NUM_TILES; i++){
 sum = arr[i][0] + arr [i][1] + arr[i][2];
 if (sum == 3) {return 1; }
 else if (sum == -3 ) { return -1;}
  }

  //check columns
  for(var i = 0; i < NUM_TILES; i++){
    sum == arr[0][i] + arr[1][i] + arr[2][i];
    if (sum == 3) {return 1; }
  else if (sum == -3 ) { return -1;}
  }
  //Check diagonals...
  sum = arr[0][0] + arr[1][1] + arr[2][2];
  if (sum == 3) {return 1; }
  else if (sum == -3 ) { return -1;}

  sum = arr[2][0] + arr[1][1] + arr[0][2];
  if (sum == 3) {return 1; }
  else if (sum == -3 ) { return -1;}

//No winners
return 0;

}


onTilePress = (row, col)=> {
//dont allows to tile change

var value = this.state.gameState[row] [col];
if(value !==0) {return; }

  var currentPlayer = this.state.currentPlayer;
//set the correct tile
  var arr = this.state.gameState.slice();
  arr[row] [col] = currentPlayer;
  this.setState({gameState : arr});


  //switch to other player
  var nextPlayer = (currentPlayer == 1 ) ? -1 : 1;
  this.setState({currentPlayer : nextPlayer}); 

  //and the winner is...
  var winner = this.getWinner();
  if (winner == 1) {
    Alert.alert("🎉 Gana Jugador 1 🎉 🦖");
    this.initializeGame();
  }
  else if  (winner == -1) {
    Alert.alert("🎉 Gana Jugador 2 🎉 🦕");
    this.initializeGame();
  }
}

onNewGamePress = () => {
  this.initializeGame();
}

renderIcon = (row,col) => {
  var value = this.state.gameState[row][col];
  switch(value)
  {
    case 1: return <Image source={{uri:"http://drive.google.com/uc?export=view&id=1piOwpaye2lpp5VbL2hCJMoYvtItlIStV"}} name="diplodocus" style={{
      width: 65,
      height: 65,
      alignSelf: "center",
      marginVertical: 18
    }}/>;

    case -1: return  <Image source={{uri:"http://drive.google.com/uc?export=view&id=1Y1xte1NwJEwo1l7_ktTd5XrIEaU0amjP"}} name="diplodocus" style={{
      width: 65,
      height: 65,
      alignSelf: "center",
      marginVertical: 18
    }}/>;

    default: return <View/>;
  }
}

  render() {  
    return (
      <View style={styles.container}>

        <View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0  }]}>
        {this.renderIcon(0,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth: 0 } ]}>
        {this.renderIcon(0,1)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 } ]}>
        {this.renderIcon(0,2)}
        </TouchableOpacity>

        </View>
      
      
        <View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth: 0 } ]}>
        {this.renderIcon(1,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.tile, { } ]}>
        {this.renderIcon(1,1)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={[styles.tile, { borderRightWidth: 0 } ]}>
        {this.renderIcon(1,2)}
        </TouchableOpacity>

        </View>
      
      
        <View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
        {this.renderIcon(2,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
        {this.renderIcon(2,1)}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
        {this.renderIcon(2,2)}
        </TouchableOpacity>

        </View>

        <View style={{paddingTop:25}}/>
        <Button title="Nuevo Juego" onPress={this.onNewGamePress}/>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

tile: {
  borderWidth: 2,
  width: 100,
  height: 100,
  borderColor: '#5499C7',
}
});
