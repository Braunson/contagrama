<template>
  <div id="app">
    <textarea 
      autocomplete="off" 
      autocorrect="off" 
      autocapitalize="off" 
      spellcheck="false">
    </textarea>
  	<div class="chart">
  	  <div class="group" v-for="group in chart">
  	    <div class="title">{{group.title}}
  	      <table>
  	        <tr v-for="item in group.data">
  	          <td>{{item}}</td>
  	          <td>xxx</td>
  	        </tr>
  	      </table>
  	    </div>
  	</div>
  </div>
</template>