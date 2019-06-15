export function timestampToDate( timestamp ) {

	try {

		var obj_date = new Date( timestamp);

		var year = obj_date.getFullYear();
		var month = obj_date.getMonth() + 1;
			month = month < 10
					? "0" + month
					: month;

		var day = obj_date.getDate();
			day = day < 10
					? "0" + day
					: day;
		var hour = obj_date.getHours();
			hour = hour < 10
					? "0" + hour
					: hour;
		var min = obj_date.getMinutes();
			min = min < 10
						? "0" + min
						: min;

		var time = day + '/' + month + '/' + year + '  ' + hour + ':' + min;
		
		return time;

	} catch ( e ) {		
		
		return ( '' );

	}
	
}