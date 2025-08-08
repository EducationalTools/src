<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { AlertCircle, Play, Pause, Square, RotateCcw, Timer, Clock } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';

	// Stopwatch state
	let stopwatchTime = $state(0); // in milliseconds
	let stopwatchRunning = $state(false);
	let stopwatchLaps = $state<number[]>([]);
	let stopwatchInterval: NodeJS.Timeout | null = null;

	// Timer state
	let timerMinutes = $state(5);
	let timerSeconds = $state(0);
	let timerTotalTime = $state(0); // in milliseconds
	let timerCurrentTime = $state(0); // in milliseconds
	let timerRunning = $state(false);
	let timerInterval: NodeJS.Timeout | null = null;
	let timerFinished = $state(false);

	// Format time from milliseconds to MM:SS.mmm
	function formatTime(ms: number, showMilliseconds = true): string {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		const milliseconds = Math.floor((ms % 1000) / 10);

		if (showMilliseconds) {
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
		} else {
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		}
	}

	// Stopwatch functions
	function startStopwatch() {
		if (!stopwatchRunning) {
			stopwatchRunning = true;
			const startTime = Date.now() - stopwatchTime;
			stopwatchInterval = setInterval(() => {
				stopwatchTime = Date.now() - startTime;
			}, 10);
		}
	}

	function pauseStopwatch() {
		stopwatchRunning = false;
		if (stopwatchInterval) {
			clearInterval(stopwatchInterval);
			stopwatchInterval = null;
		}
	}

	function resetStopwatch() {
		pauseStopwatch();
		stopwatchTime = 0;
		stopwatchLaps = [];
	}

	function lapStopwatch() {
		if (stopwatchRunning) {
			stopwatchLaps = [...stopwatchLaps, stopwatchTime];
		}
	}

	function removeLap(index: number) {
		stopwatchLaps = stopwatchLaps.filter((_, i) => i !== index);
	}

	// Timer functions
	function startTimer() {
		if (timerCurrentTime <= 0) {
			timerTotalTime = (timerMinutes * 60 + timerSeconds) * 1000;
			timerCurrentTime = timerTotalTime;
		}

		if (timerCurrentTime > 0 && !timerRunning) {
			timerRunning = true;
			timerFinished = false;
			const startTime = Date.now();
			const initialTime = timerCurrentTime;

			timerInterval = setInterval(() => {
				const elapsed = Date.now() - startTime;
				timerCurrentTime = Math.max(0, initialTime - elapsed);

				if (timerCurrentTime <= 0) {
					timerRunning = false;
					timerFinished = true;
					if (timerInterval) {
						clearInterval(timerInterval);
						timerInterval = null;
					}
					// Play notification sound or show notification
					playNotification();
				}
			}, 10);
		}
	}

	function pauseTimer() {
		timerRunning = false;
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}

	function resetTimer() {
		pauseTimer();
		timerCurrentTime = 0;
		timerFinished = false;
	}

	function playNotification() {
		// Create a simple beep sound
		try {
			const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.frequency.value = 800;
			oscillator.type = 'sine';

			gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 1);
		} catch (error) {
			console.warn('Could not play notification sound:', error);
		}
	}

	// Calculate timer progress percentage
	$effect(() => {
		if (timerTotalTime > 0) {
			const progress = ((timerTotalTime - timerCurrentTime) / timerTotalTime) * 100;
			// You could use this for a progress bar if needed
		}
	});

	// Cleanup intervals on component destroy
	onDestroy(() => {
		if (stopwatchInterval) clearInterval(stopwatchInterval);
		if (timerInterval) clearInterval(timerInterval);
	});
</script>

<div class="container mx-auto flex h-screen max-w-4xl items-center justify-center p-4">
	<Tabs value="stopwatch" class="w-full">
		<TabsList class="mb-6 grid w-full grid-cols-2">
			<TabsTrigger value="stopwatch" class="flex items-center gap-2">
				<Clock class="h-4 w-4" />
				Stopwatch
			</TabsTrigger>
			<TabsTrigger value="timer" class="flex items-center gap-2">
				<Timer class="h-4 w-4" />
				Timer
			</TabsTrigger>
		</TabsList>

		<!-- Stopwatch Tab -->
		<TabsContent value="stopwatch" class="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Clock class="h-5 w-5" />
						Stopwatch
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-6">
					<!-- Time Display -->
					<div class="text-center">
						<div class="mb-4 font-mono text-6xl font-bold tabular-nums">
							{formatTime(stopwatchTime)}
						</div>
						{#if stopwatchRunning}
							<Badge variant="default" class="text-sm">
								<div class="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
								Running
							</Badge>
						{:else}
							<Badge variant="secondary" class="text-sm">Stopped</Badge>
						{/if}
					</div>

					<!-- Controls -->
					<div class="flex justify-center gap-4">
						{#if !stopwatchRunning}
							<Button onclick={startStopwatch} size="lg" class="flex items-center gap-2">
								<Play class="h-4 w-4" />
								Start
							</Button>
						{:else}
							<Button
								onclick={pauseStopwatch}
								variant="secondary"
								size="lg"
								class="flex items-center gap-2"
							>
								<Pause class="h-4 w-4" />
								Pause
							</Button>
						{/if}

						<Button
							onclick={resetStopwatch}
							variant="outline"
							size="lg"
							class="flex items-center gap-2"
						>
							<RotateCcw class="h-4 w-4" />
							Reset
						</Button>

						{#if stopwatchRunning}
							<Button onclick={lapStopwatch} variant="outline" size="lg">Lap</Button>
						{/if}
					</div>
				</CardContent>
			</Card>

			<!-- Lap Times -->
			{#if stopwatchLaps.length > 0}
				<Card>
					<CardHeader>
						<CardTitle class="text-lg">Lap Times ({stopwatchLaps.length})</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="max-h-60 space-y-2 overflow-y-auto">
							{#each stopwatchLaps.toReversed() as lap, index}
								{@const lapIndex = stopwatchLaps.length - index}
								{@const previousLap = stopwatchLaps[stopwatchLaps.length - index - 2]}
								{@const splitTime = previousLap ? lap - previousLap : lap}
								<div class="bg-muted/50 flex items-center justify-between rounded-md px-3 py-2">
									<div class="font-medium">Lap {lapIndex}</div>
									<div class="flex items-center gap-4 font-mono">
										<span class="text-muted-foreground text-sm">
											+{formatTime(splitTime)}
										</span>
										<span class="font-semibold">{formatTime(lap)}</span>
										<Button
											onclick={() => removeLap(stopwatchLaps.length - index - 1)}
											variant="ghost"
											size="sm"
											class="h-6 w-6 p-0"
										>
											×
										</Button>
									</div>
								</div>
							{/each}
						</div>
					</CardContent>
				</Card>
			{/if}
		</TabsContent>

		<!-- Timer Tab -->
		<TabsContent value="timer" class="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Timer class="h-5 w-5" />
						Timer
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-6">
					<!-- Timer Setup -->
					{#if !timerRunning && timerCurrentTime === 0}
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="minutes">Minutes</Label>
								<Input
									id="minutes"
									type="number"
									bind:value={timerMinutes}
									min="0"
									max="99"
									class="text-center"
								/>
							</div>
							<div class="space-y-2">
								<Label for="seconds">Seconds</Label>
								<Input
									id="seconds"
									type="number"
									bind:value={timerSeconds}
									min="0"
									max="59"
									class="text-center"
								/>
							</div>
						</div>

						<!-- Quick Timer Buttons -->
						<div class="space-y-2">
							<Label>Quick Set</Label>
							<div class="flex flex-wrap gap-2">
								{#each [{ label: '1 min', minutes: 1, seconds: 0 }, { label: '5 min', minutes: 5, seconds: 0 }, { label: '10 min', minutes: 10, seconds: 0 }, { label: '15 min', minutes: 15, seconds: 0 }, { label: '25 min', minutes: 25, seconds: 0 }, { label: '30 min', minutes: 30, seconds: 0 }, { label: '45 min', minutes: 45, seconds: 0 }, { label: '1 hour', minutes: 60, seconds: 0 }] as preset}
									<Button
										variant="outline"
										size="sm"
										onclick={() => {
											timerMinutes = preset.minutes;
											timerSeconds = preset.seconds;
										}}
									>
										{preset.label}
									</Button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Time Display -->
					<div class="text-center">
						{#if timerCurrentTime > 0 || timerRunning}
							<div
								class="mb-4 font-mono text-6xl font-bold tabular-nums"
								class:text-red-500={timerCurrentTime < 10000}
							>
								{formatTime(timerCurrentTime, false)}
							</div>
							{#if timerTotalTime > 0}
								<div class="bg-muted mb-4 h-2 w-full rounded-full">
									<div
										class="bg-primary h-2 rounded-full transition-all duration-75"
										style="width: {((timerTotalTime - timerCurrentTime) / timerTotalTime) * 100}%"
									></div>
								</div>
							{/if}
						{:else}
							<div class="text-muted-foreground mb-4 font-mono text-6xl font-bold tabular-nums">
								{String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
							</div>
						{/if}

						{#if timerFinished}
							<Badge variant="destructive" class="animate-pulse text-sm">
								<AlertCircle class="mr-1 h-4 w-4" />
								Time's Up!
							</Badge>
						{:else if timerRunning}
							<Badge variant="default" class="text-sm">
								<div class="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
								Running
							</Badge>
						{:else if timerCurrentTime > 0}
							<Badge variant="secondary" class="text-sm">Paused</Badge>
						{:else}
							<Badge variant="outline" class="text-sm">Ready</Badge>
						{/if}
					</div>

					<!-- Timer Controls -->
					<div class="flex justify-center gap-4">
						{#if !timerRunning}
							<Button
								onclick={startTimer}
								size="lg"
								class="flex items-center gap-2"
								disabled={(timerMinutes === 0 && timerSeconds === 0) || timerFinished}
							>
								<Play class="h-4 w-4" />
								Start
							</Button>
						{:else}
							<Button
								onclick={pauseTimer}
								variant="secondary"
								size="lg"
								class="flex items-center gap-2"
							>
								<Pause class="h-4 w-4" />
								Pause
							</Button>
						{/if}

						<Button
							onclick={resetTimer}
							variant="outline"
							size="lg"
							class="flex items-center gap-2"
						>
							<Square class="h-4 w-4" />
							Reset
						</Button>
					</div>

					{#if timerFinished}
						<div
							class="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-800 dark:bg-red-950"
						>
							<AlertCircle class="mx-auto mb-2 h-8 w-8 text-red-500" />
							<p class="font-medium text-red-700 dark:text-red-300">Timer completed!</p>
							<p class="text-sm text-red-600 dark:text-red-400">
								Your {formatTime(timerTotalTime, false)} timer has finished.
							</p>
						</div>
					{/if}
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>

<style>
	.tabular-nums {
		font-variant-numeric: tabular-nums;
	}
</style>
