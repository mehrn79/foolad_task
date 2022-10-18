import Vuex from "vuex";
import Axios from 'axios'

const store = () => {
    return new Vuex.Store({
        state: {
            orders: null,
            isLoading: false,
          },
          getters: {
            orders(state) {
              return state.orders;
            },
            isLoading(state) {
              return state.isLoading;
            },
          },
          mutations: {

            setOrder(state, orders){
                state.orders=orders
            },
            updateIsLoading(state, isLoading) {
              state.isLoading = isLoading;
            },
        
            updateChanges(state, changes) {
              state.changes = changes;
            },
        
            removeItem(state, change) {

                state.orders=state.orders.filter(elm=>elm.id !== change.key)
            },
            updateOrders(state, data){
              state.orders=state.orders.map(elm => elm.id === data.id ? data : elm)
            },
            addToOrders(state, data){
              state.orders.push(data)
            }
          },
          actions: {

            getOrders(vuexContext) {

                Axios.get('https://dummyjson.com/products?limit=100')
                 .then(res=>vuexContext.commit('setOrder',res.data.products))
                 .catch(e=>console.log(e))
            },


            setEditRowKey(context, value) {
              context.commit('updateEditRowKey', value);
            },
        
            setChanges(context, value) {
              context.commit('updateChanges', value);
            },
        
            async insert(context, change) {
      
              const res= await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(change.data)
              })

              const data= await res.json()
              context.commit('addToOrders', data)
            },
        
            update(context, change) {
               
                fetch(`https://dummyjson.com/products/${change.key}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(change.data)
                })
                
                .then(res => res.json())
                .then(data => context.commit('updateOrders', data));
                
            },

            async remove(context, change) {

                try {
                    await Axios(`https://dummyjson.com/products/${change.key}`, {
                    method: 'DELETE',
                    
                    })
                    context.commit('removeItem', change )
                } catch (error) {
                    console.log(error)
                }
               
                
            },
          },
    })
    }

    export default store;
