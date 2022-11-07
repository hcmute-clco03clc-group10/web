<script lang='ts'>
	import SideNavigation from "$lib/SideNavigation.svelte";

</script>

<SideNavigation>
    <div class="flex flex-col flex-1 w-0 overflow-hidden">
        <main class="relative flex-1 overflow-y-auto focus:outline-none">
            <div class="py-6">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                    <h1 class="text-lg text-neutral-600">Here is where you put your stuff</h1>
                </div>
                <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                    <!-- Put your content here -->
                    <div class="py-4">
                        <div class="rounded-lg bg-gray-50 h-96"></div>
                    </div>
                    <!-- Do not cross the closing tag underneath this coment-->
                </div>
            </div>
        </main>
    </div>
</SideNavigation>
