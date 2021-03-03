<template>
  <div class="hello">
    <div class="flex p-1">
      <div class="flex-none w-44 relative">
        <img src="/fancy-suit-jacket.jpg" alt="" class="absolute inset-0 w-full h-full object-cover">
      </div>
      <form class="flex-auto py-7 px-8">
        <div class="flex flex-wrap items-baseline">
          <h1 class="w-full flex-none text-3xl text-black mb-1.5">
            Fancy Suit Jacket
          </h1>
          <div class="text-lg leading-6 text-black">
            $600.00
          </div>
          <div class="text-sm text-gray-500 ml-3">
            In stock
          </div>
        </div>
        <div class="flex items-baseline mt-9 py-4 border-t border-gray-100">
          <div class="space-x-2 flex text-sm font-light text-black">
            <label>
              <input class="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white" name="size" type="radio" value="xs" checked>
              XS
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center rounded-full" name="size" type="radio" value="s">
              S
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center rounded-full" name="size" type="radio" value="m">
              M
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center rounded-full" name="size" type="radio" value="l">
              L
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center rounded-full" name="size" type="radio" value="xl">
              XL
            </label>
          </div>
          <div class="ml-auto text-sm font-light text-gray-500">Size Guide</div>
        </div>
        <div class="flex space-x-3 mb-3 text-sm font-semibold uppercase">
          <div class="flex-auto flex space-x-3">
            <button class="w-1/2 flex items-center justify-center bg-black text-white" type="submit">Buy now</button>
            <button class="w-1/2 flex items-center justify-center border border-gray-200" type="button">Add to bag</button>
          </div>
          <button class="flex-none flex items-center justify-center w-12 h-12 text-gray-900 border border-gray-200" type="button" aria-label="like">
            <svg width="20" height="20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-500">
          Free shipping on all continental US orders.
        </p>
      </form>
    </div>
    <section class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header class="flex items-center justify-between">
        <h2 class="text-lg leading-6 font-medium text-black">Projects</h2>
        <button class="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
          <svg class="group-hover:text-light-blue-600 text-light-blue-500 mr-2" width="12" height="20" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          New
        </button>
      </header>
      <form class="relative">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input class="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10" type="text" aria-label="Filter projects" placeholder="Filter projects">
      </form>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <li v-for="item in items" :key="item.id">
          <a :href="item.url" class="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
            <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
              <div>
                <dt class="sr-only">Title</dt>
                <dd class="group-hover:text-white leading-6 font-medium text-black">
                  {{ item.title }}
                </dd>
              </div>
              <div>
                <dt class="sr-only">Category</dt>
                <dd class="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                  {{ item.category }}
                </dd>
              </div>
              <div class="col-start-2 row-start-1 row-end-3">
                <dt class="sr-only">Users</dt>
                <dd class="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                  <img
                    v-for="user in item.users"
                    :key="user.id"
                    :src="user.avatar"
                    :alt="user.name"
                    width="48"
                    height="48"
                    class="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  >
                </dd>
              </div>
            </dl>
          </a>
        </li>
        <li class="hover:shadow-lg flex rounded-lg">
          <a href="/new" class="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
            New Project
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      items: [
        {
          id: 1,
          url: '#',
          title: 'API Integration',
          category: '1',
          users: [
            {
              id: 1,
              avatar: '',
              name: 'asdasd'
            }
          ]

        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
