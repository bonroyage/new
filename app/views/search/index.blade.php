@section('content')
@include('search.bar')
<div class="container">
	<div class="page-header"><h1>Search <small>{{ $q }}</small></h1></div>

	<h2>Flights <small class="pull-right" style="margin-top: 10px;">{{ $flights->count() }} results</small></h2>
	@if($flights->count() > 0)
	<table class="table table-striped table-hover" style="margin-top: 20px;">
		<thead>
			<tr>
				<th>Callsign</th>
				<th>Type</th>
				<th>Pilot</th>
				<th>From</th>
				<th>To</th>
				<th>Duration</th>
			</tr>
		</thead>
		<tbody class="rowlink" data-link="row">
			@foreach($flights as $flight)
			<tr>
				<td><a href="{{ URL::route('flight.show', $flight->id) }}"><img src="{{ asset('assets/images/flightstates/' . $flight->status_icon . '.png') }}"> {{ $flight->callsign }}</a>
					@if($flight->callsign_type == 1)
					<br /><img src="{{ asset('assets/images/airlines/' . $flight->airline_id . '.png') }}"></td>
					@elseif($flight->callsign_type == 2)
					<br /><img src="{{ asset('assets/images/flags/' . $flight->airline_id . '.png') }}"> <em>Private</em>
					@else
					<br />&nbsp;
					@endif
				<td>{{ $flight->aircraft_id }}</td>
				<td>{{ $flight->pilot->name }}</td>
				<td><img src="{{ asset('assets/images/flags/' . $flight->departure_country_id . '.png') }}"> {{ $flight->departure->id or '' }} {{ $flight->departure->city or ''}}
					@if($flight->state > 1)
					<br /><small>Depart at: {{ $flight->departure_time->format('H:i') }}</small>
					@endif
				</td>
				<td><img src="{{ asset('assets/images/flags/' . $flight->arrival_country_id . '.png') }}"> {{ $flight->arrival->id or '' }} {{ $flight->arrival->city or '' }}
					@if($flight->state > 1)
					<br /><small>Arrive at: {{ $flight->arrival_time->format('H:i') }}</small></td>
					@endif
				<td>{{ ($flight->state == 0) ? '<em>Departing</em>' : $flight->traveled_time }}</td>
			</tr>
			@endforeach
		</tbody>
	</table>
	@endif
	<hr />
	<h2>Pilots <small class="pull-right" style="margin-top: 10px;">{{ $pilots->count() }} results</small></h2>
	@if($pilots->count() > 0)
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>VATSIM ID</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody class="rowlink" data-link="row">
		@foreach($pilots as $pilot)
			<tr>
				<td><a href="{{ URL::route('pilot.show', $pilot->vatsim_id) }}">{{ $pilot->vatsim_id }}</a></td>
				<td>{{ $pilot->name }}</td>
			</tr>
		@endforeach
		</tbody>
	</table>
	@endif

</div>

@stop