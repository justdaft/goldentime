<template>
  <div id="app">
    <el-menu theme="dark" default-active="1" v-for="(user, index) in users" class="el-menu-demo" mode="horizontal" @select="handleSelect(user)">
      <el-menu-item index="1">{{user.name}}</el-menu-item>
    </el-menu>

    <h1> {{currentUser.name}}</h1>
    <!--<el-steps :space="100" :active="active" finish-status="success">
  <el-step title="Poor"></el-step>
  <el-step title="Good"></el-step>
  <el-step title="Great"></el-step>
</el-steps>-->
    <div class="block">
      <el-progress :text-inside="true" type="circle" :stroke-width="18" :percentage="currentUser.timeRemaining" status="exception"></el-progress>
    </div>
    <div class="block">
      <el-slider v-model="currentUser.timeRemaining" show-stops :step="step" show-input>
      </el-slider>
    </div>
    <!--<el-button type="primary" icon="minus" v-if="currentUser.timeRemaining >= 5" @click.prevent="decStep"></el-button>
    <h3> {{currentUser.timeRemaining}}</h3>
    <el-button type="primary" icon="plus" v-if="currentUser.timeRemaining <= 95" @click.prevent="incStep"></el-button>-->

    <!--<el-button @click="visible = true">Button</el-button>
    <el-dialog v-model="visible" title="Settings">
      <p>Settings</p>
      {{currentUser.name}}: {{currentUser.timeRemaining}}
    </el-dialog>-->

  </div>
</template>

<script>
  var config = {
  
  };

  firebase.initializeApp(config)

  var usersRef = firebase.database().ref('/users')


  export default {
    name: 'app',
    data() {
      return {
        visible: false,
        activeName: 'first',
        active: 0,
        step: 5,
        user: '',
        currentUser: {
          name: '',
          timeRemaining: 0
        }
      }
    },
    firebase: {
      users: usersRef
    },
    methods: {
      incStep() {
        this.currentUser.timeRemaining += 5;
        let path = `/` + (this.currentUser.name).toLowerCase() + `/` + 'timeRemaining';
        usersRef.child(path).set(this.currentUser.timeRemaining)
      },
      decStep() {
        this.currentUser.timeRemaining -= 5;
        let path = `/` + (this.currentUser.name).toLowerCase() + `/` + 'timeRemaining';
        usersRef.child(path).set(this.currentUser.timeRemaining)
      },
      handleSelect(user, event) {
        console.log(user['.key'] + ' ' + user.name + ' ' + user.timeRemaining + ' ' + user.theme);
        this.currentUser.name = user.name;
        this.currentUser.theme = user.theme;
        this.currentUser.timeRemaining = user.timeRemaining;
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>