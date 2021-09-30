<template>
  <div id="app">
    <router-link 
      style="text-decoration: none; color: inherit;"
      to="/">
        <div class="title">Rick and Morty</div>
    </router-link>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.title{
	width: 100%;
	height: 50px;
	background: #e36686;
	color: #fff;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	text-transform: uppercase;
	letter-spacing: 5px;
	font-weight: 900;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background : #eeeff4;
}
</style>
