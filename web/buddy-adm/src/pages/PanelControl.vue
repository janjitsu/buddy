<template lang="html">
	<div class="painelcontrole">
		<div v-if="loading">
			<div class="row-fluid">
				<div class="col-xs-6 text-center">
					<loading text="Carregando Painel de Controle..." :height="80" :width="80"></loading>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="col-xs-12">
				<div class="painelcontrole__title">
					<h3>Painel de Controle
						<span class="pull-right" v-if="btnRefresh">
							<button class="btn btn-warning btn-md" v-on:click="refreshData()">Recarregar Dados</button>
						</span>
					</h3>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="painelcontrole__dashboard">
					<div class="painelcontrole__dashboard__title">
						<ul class="list-unstyled" v-for="(area, index) in data" :index="index" :area="area">
							<h2>{{index}}</h2>
							<li v-for="(year, index) in area" :index="index" :year="year">
								<!-- <span><b>{{index}}</b></span> -->
								<div v-for="(month, index) in year" :index="index" :month="month">
									<span>Mês: {{index}}</span>
									<div v-for="(day, index, key) in month">
										<ul class="list-inline">
											<li v-for="(item, index, key) in day" :key="key">
												<div>Dia: {{item.date}}</div>
												<div>Voto: {{item.vote}}</div>
											</li>
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div> <!-- painelcontrole -->
</template>

<script>
import Firebase from 'firebase'
import {config} from '../firebase.js'
import loading from '../components/Loading.vue'
import moment from 'moment'

export default {
	name: 'PanelControl',
	components:{
		loading
	},
	data() {
		return {
			loading: true,
			data: {},
			dataLocal: '',
			btnRefresh: false,
			titles: [],
			media: []
		}
	},
	mounted() {
		var vm = this;

		this.$root.$emit('verify-route');

		vm.dataLocal = JSON.parse( localStorage.getItem('Buddy-Admin-Votes') );

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user && vm.dataLocal != null) {
					vm.loadingDataLocal()
				} else if (user && vm.dataLocal == null ) {
					vm.loadingData();
				} 
				else {
					vm.$router.push('/');
				}
			}, 1500);
		});
	},
	methods: {
		menu: function() {
			var vm = this;
			this.$root.$emit('verify-route');
		},
		loadingDataLocal: function() {
			var vm = this;
			this.data = this.dataLocal;
			this.loading = false;
			this.btnRefresh = true;
			console.log('loading localStorage data')
			// this.calculateInfos(this.data)
		},
		loadingData: function() {
			var vm = this;
			let url = config.databaseURL+'/.json';
			vm.$http.get(url).then(response => {
				vm.data = response.body;
				// this.calculateInfos(vm.data);
				localStorage.removeItem('Buddy-Admin-Votes');
				localStorage.setItem('Buddy-Admin-Votes', JSON.stringify(vm.data) );
				this.btnRefresh = true;
				vm.loading = false;
				console.log('loading firebase data')
			}, response => {
				if(response.status != 200) {
					console.log('Error: '+response)
				}
			});
		},
		refreshData: function() {
			this.loading = true;
			this.btnRefresh = false;
			setTimeout(() => {
				this.loadingData();
			}, 800);
		},
		calculateInfos: function(data) {
			var vm = this;
			moment.locale('pt-br');

			for ( let key in data ) {
				/* key = setores */
				let title = key;

				// console.log(key)
				for ( let item in data[key] ) {
					let vote = 0;
					let voteTotalDay = 0;
					let voteTotalMonth = 0;
					let quantVotesDay = 0;
					let quantVotesMonth = 0;
					let newValue = 0;					
					/* item = data */
					// console.log('data: '+item)
					for ( let subitem in data[key][item].vote ) {
						/* subitem = key object */
						newValue = data[key][item];
						vote = data[key][item].vote[subitem].vote;
						// console.log('Vote: '+vote)
						voteTotalDay = vote + voteTotalDay;
						/* number max of votes */
						quantVotesDay = Object.keys(data[key][item].vote);
					} /* for 3 */
					// console.log('Vote Total: '+voteTotalDay)
					// console.log('Quantidade de votos: '+quantVotesDay.length )

					item = item.replace(/-/g, '/');
					let month = moment(item, 'DD/MM/YYYY', true).format();
					month = moment(month).format('MMMM');
					// console.log(month)
					/* insert new value on object | newValue */
					newValue.voteMonth = month;
					newValue.voteTotalDay = voteTotalDay;
					newValue.quantVotesDay = quantVotesDay.length;
					let mediaDay = (voteTotalDay / quantVotesDay.length);
					newValue.mediaDay = mediaDay.toFixed(1);

				} /* for 2 */

				// console.log( this.data[key] )
			} /* for 1 */

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
