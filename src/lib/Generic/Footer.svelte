<script>

	import { PUBLIC_AUTHOR_NAME, PUBLIC_GITHUB_PROJECT_URL } from "$env/static/public";

</script>
<footer class="bg-gray-900 text-gray-300 p-6 mt-8">
	<div class="container mx-auto flex flex-col items-center">
		<p class="text-lg mb-4 text-center">
			🚀 Open-source project available on GitHub. Contributions are welcome!
		</p>

		<div class="flex space-x-6">
			<a href={PUBLIC_GITHUB_PROJECT_URL} target="_blank" class="flex items-center space-x-2 hover:text-white">
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0C5.371 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.066c-3.34.727-4.043-1.615-4.043-1.615-.546-1.387-1.332-1.757-1.332-1.757-1.09-.744.083-.729.083-.729 1.203.085 1.837 1.234 1.837 1.234 1.07 1.832 2.809 1.303 3.494.995.108-.775.418-1.303.762-1.602-2.665-.306-5.467-1.336-5.467-5.941 0-1.312.469-2.387 1.236-3.23-.123-.304-.535-1.527.117-3.184 0 0 1.008-.323 3.3 1.23a11.509 11.509 0 0 1 3.004-.403c1.02.004 2.047.137 3.005.403 2.291-1.553 3.297-1.23 3.297-1.23.653 1.657.241 2.88.118 3.184.77.843 1.236 1.917 1.236 3.23 0 4.617-2.807 5.631-5.482 5.929.43.37.824 1.104.824 2.227v3.293c0 .319.191.694.801.576C20.565 21.797 24 17.302 24 12 24 5.372 18.627 0 12 0z"
					/>
				</svg>
				<span>Project on GitHub</span>
			</a>
			<a href="https://github.com/RMaster121" target="_blank" class="flex items-center space-x-2 hover:text-white">
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0C5.371 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.066c-3.34.727-4.043-1.615-4.043-1.615-.546-1.387-1.332-1.757-1.332-1.757-1.09-.744.083-.729.083-.729 1.203.085 1.837 1.234 1.837 1.234 1.07 1.832 2.809 1.303 3.494.995.108-.775.418-1.303.762-1.602-2.665-.306-5.467-1.336-5.467-5.941 0-1.312.469-2.387 1.236-3.23-.123-.304-.535-1.527.117-3.184 0 0 1.008-.323 3.3 1.23a11.509 11.509 0 0 1 3.004-.403c1.02.004 2.047.137 3.005.403 2.291-1.553 3.297-1.23 3.297-1.23.653 1.657.241 2.88.118 3.184.77.843 1.236 1.917 1.236 3.23 0 4.617-2.807 5.631-5.482 5.929.43.37.824 1.104.824 2.227v3.293c0 .319.191.694.801.576C20.565 21.797 24 17.302 24 12 24 5.372 18.627 0 12 0z"
					/>
				</svg>
				<span>{PUBLIC_AUTHOR_NAME}</span>
			</a>
		</div>

		<div class="mt-6">
			<p class="text-sm text-gray-500">
				Made with ❤️ by <a href="https://github.com/RMaster121" target="_blank" class="hover:text-white">{PUBLIC_AUTHOR_NAME}</a>
			</p>
		</div>
	</div>
</footer>