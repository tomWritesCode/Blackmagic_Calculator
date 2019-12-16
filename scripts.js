
let timeShooting = 0;

let $BitRate = {
	BRAW_3_1: 0,
	BRAW_5_1: 0,
	BRAW_8_1: 0,
	BRAW_12_1: 0,
	BRAW_Q0: {
		low: 0,
		high: 0
	},
	BRAW_Q5: {
		low: 0,
		high: 0
	},
	PRORES_422_HQ: 0,
	PRORES_422: 0,
	PRORES_422_LT: 0,
	PRORES_PROXY: 0
};

let $MemoryTotal = {
	BRAW_3_1: 0,
	BRAW_5_1: 0,
	BRAW_8_1: 0,
	BRAW_12_1: 0,
	BRAW_Q0: {
		low: 0,
		high: 0
	},
	BRAW_Q5: {
		low: 0,
		high: 0
	},
	PRORES_422_HQ: 0,
	PRORES_422: 0,
	PRORES_422_LT: 0,
	PRORES_PROXY: 0
};

function BRAW_SELECT() {
	$BitRate_Update($BitRate);
	document.getElementById('BRAW_Container').classList.add('selected');
	document.getElementById('PRORES_Container').classList.remove('selected');
}
function PRORES_SELECT() {
	$BitRate_Update($BitRate);
	document.getElementById('PRORES_Container').classList.add('selected');
	document.getElementById('BRAW_Container').classList.remove('selected');
}

// Checking for Codec Selection
document.addEventListener('input', function(event) {
	if (event.target.id !== 'CodecSelect') return;

	if (event.target.value === 'BRAW') {
		BRAW_SELECT();
	}
	if (event.target.value === 'PRORES') {
		PRORES_SELECT();
	}
});

function MemoryDivision(MemorySize) {
	if (MemorySize === 'N/A') {
		return;
	} else if (MemorySize > 1024) {
		let GBSize = MemorySize / 1000;

		if (GBSize > 1024) {
			let TBSize = GBSize / 1000;
			return TBSize.toFixed(2) + 'TB';
		} else {
			return GBSize.toFixed(2) + 'GB';
		}
	} else {
		return MemorySize + 'MB';
	}
}

function setMemoryTotal() {
	document.getElementById('BRAW_3_1_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.BRAW_3_1
	);
	document.getElementById('BRAW_5_1_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.BRAW_5_1
	);
	document.getElementById('BRAW_8_1_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.BRAW_8_1
	);
	document.getElementById('BRAW_12_1_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.BRAW_12_1
	);
	document.getElementById('BRAW_Q0_SIZE').innerHTML =
		MemoryDivision($MemoryTotal.BRAW_Q0.low) +
		' - ' +
		MemoryDivision($MemoryTotal.BRAW_Q0.high);

	document.getElementById('BRAW_Q5_SIZE').innerHTML =
		MemoryDivision($MemoryTotal.BRAW_Q5.low) +
		' - ' +
		MemoryDivision($MemoryTotal.BRAW_Q5.high);

	document.getElementById('PRORES_422_HQ_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.PRORES_422_HQ
	);
	document.getElementById('PRORES_422_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.PRORES_422
	);
	document.getElementById('PRORES_422_LT_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.PRORES_422_LT
	);
	document.getElementById('PRORES_PROXY_SIZE').innerHTML = MemoryDivision(
		$MemoryTotal.PRORES_PROXY
	);
}

document.getElementById('SizeCalculator').onclick = function CalculateSize() {
	if (document.getElementById('Time').value === '') {
		alert('You need to add a timeframe');
	} else {
		// Get Value from input (Minutes)
		timeShooting = document.getElementById('Time').value;
		// Minutes x 60 = Seconds
		let secondsShooting = timeShooting * 60;
		// Seconds x bitrate giving total in MB
		$MemoryTotal = {
			BRAW_3_1: secondsShooting * $BitRate.BRAW_3_1,
			BRAW_5_1: secondsShooting * $BitRate.BRAW_5_1,
			BRAW_8_1: secondsShooting * $BitRate.BRAW_8_1,
			BRAW_12_1: secondsShooting * $BitRate.BRAW_12_1,
			BRAW_Q0: {
				low: secondsShooting * $BitRate.BRAW_Q0.low,
				high: secondsShooting * $BitRate.BRAW_Q0.high
			},
			BRAW_Q5: {
				low: secondsShooting * $BitRate.BRAW_Q5.low,
				high: secondsShooting * $BitRate.BRAW_Q5.high
			},
			PRORES_422_HQ: secondsShooting * $BitRate.PRORES_422_HQ,
			PRORES_422: secondsShooting * $BitRate.PRORES_422,
			PRORES_422_LT: secondsShooting * $BitRate.PRORES_422_LT,
			PRORES_PROXY: secondsShooting * $BitRate.PRORES_PROXY
		};
		// IF total GB > 1000 then / 1000 to give total TB needed (round to 2 decimal)

		setMemoryTotal();
	}
};

function $BitRate_Update($BitRate) {
	if (
		document.getElementById('CodecSelect').value === 'PRORES' &&
		`${$BitRate.PRORES_422_HQ}` === 'N/A'
	) {
		document.getElementById('PRORES_Container').classList.remove('selected');
		document.getElementById('NO_PRORES').classList.add('selected');
	} else {
		document.getElementById('NO_PRORES').classList.remove('selected');
		// document.getElementById('PRORES_Container').classList.add('selected');
		//Updates BRAW List
		document.getElementById('BRAW_3_1').innerHTML = `${$BitRate.BRAW_3_1}MB/s`;
		document.getElementById('BRAW_5_1').innerHTML = `${$BitRate.BRAW_5_1}MB/s`;
		document.getElementById('BRAW_8_1').innerHTML = `${$BitRate.BRAW_8_1}MB/s`;
		document.getElementById('BRAW_12_1').innerHTML = `${
			$BitRate.BRAW_12_1
		}MB/s`;
		document.getElementById('BRAW_Q0').innerHTML = `${
			$BitRate.BRAW_Q0.low
		}MB/s - ${$BitRate.BRAW_Q0.high}MB/s`;
		document.getElementById('BRAW_Q5').innerHTML = `${
			$BitRate.BRAW_Q5.low
		}MB/s - ${$BitRate.BRAW_Q5.high}MB/s`;
		//Updates ProRes List
		document.getElementById('PRORES_422_HQ').innerHTML =
			`${$BitRate.PRORES_422_HQ}` +
			`${$BitRate.PRORES_422_HQ === 'N/A' ? '' : 'MB/s'}`;
		document.getElementById('PRORES_422').innerHTML =
			`${$BitRate.PRORES_422}` +
			`${$BitRate.PRORES_422 === 'N/A' ? '' : 'MB/s'}`;
		document.getElementById('PRORES_422_LT').innerHTML =
			`${$BitRate.PRORES_422_LT}` +
			`${$BitRate.PRORES_422_LT === 'N/A' ? '' : 'MB/s'}`;
		document.getElementById('PRORES_PROXY').innerHTML =
			`${$BitRate.PRORES_PROXY}` +
			`${$BitRate.PRORES_PROXY === 'N/A' ? '' : 'MB/s'}`;
	}
}

document.addEventListener('input', function(event) {
	if (event.target.id !== 'ResolutionSelect') return;

	if (event.target.value === '4KDCI') {
		$BitRate = {
			BRAW_3_1: 135,
			BRAW_5_1: 81,
			BRAW_8_1: 51,
			BRAW_12_1: 34,
			BRAW_Q0: {
				low: 81,
				high: 203
			},
			BRAW_Q5: {
				low: 21,
				high: 58
			},
			PRORES_422_HQ: 117.88,
			PRORES_422: 78.63,
			PRORES_422_LT: 54.63,
			PRORES_PROXY: 24.25
		};
		$BitRate_Update($BitRate);
	}

	if (event.target.value === '4K2.4:1') {
		$BitRate = {
			BRAW_3_1: 108,
			BRAW_5_1: 65,
			BRAW_8_1: 41,
			BRAW_12_1: 27,
			BRAW_Q0: {
				low: 65,
				high: 161
			},
			BRAW_Q5: {
				low: 17,
				high: 47
			},
			PRORES_422_HQ: 'N/A',
			PRORES_422: 'N/A',
			PRORES_422_LT: 'N/A',
			PRORES_PROXY: 'N/A'
		};
		$BitRate_Update($BitRate);
	}

	if (event.target.value === 'ULTRAHD') {
		$BitRate = {
			BRAW_3_1: 127,
			BRAW_5_1: 76,
			BRAW_8_1: 48,
			BRAW_12_1: 32,
			BRAW_Q0: {
				low: 76,
				high: 190
			},
			BRAW_Q5: {
				low: 19,
				high: 55
			},
			PRORES_422_HQ: 110,
			PRORES_422: 73.6,
			PRORES_422_LT: 51,
			PRORES_PROXY: 22.4
		};
		$BitRate_Update($BitRate);
	}

	if (event.target.value === '2.8K') {
		$BitRate = {
			BRAW_3_1: 96,
			BRAW_5_1: 58,
			BRAW_8_1: 36,
			BRAW_12_1: 24,
			BRAW_Q0: {
				low: 76,
				high: 190
			},
			BRAW_Q5: {
				low: 19,
				high: 55
			},
			PRORES_422_HQ: 'N/A',
			PRORES_422: 'N/A',
			PRORES_422_LT: 'N/A',
			PRORES_PROXY: 'N/A'
		};
		$BitRate_Update($BitRate);
	}

	if (event.target.value === '2.6K') {
		$BitRate = {
			BRAW_3_1: 63,
			BRAW_5_1: 38,
			BRAW_8_1: 24,
			BRAW_12_1: 16,
			BRAW_Q0: {
				low: 38,
				high: 94
			},
			BRAW_Q5: {
				low: 10,
				high: 27
			},
			PRORES_422_HQ: 'N/A',
			PRORES_422: 'N/A',
			PRORES_422_LT: 'N/A',
			PRORES_PROXY: 'N/A'
		};
		$BitRate_Update($BitRate);
	}

	if (event.target.value === 'HD') {
		$BitRate = {
			BRAW_3_1: 33,
			BRAW_5_1: 20,
			BRAW_8_1: 13,
			BRAW_12_1: 8,
			BRAW_Q0: {
				low: 20,
				high: 49
			},
			BRAW_Q5: {
				low: 5,
				high: 14
			},
			PRORES_422_HQ: 27.5,
			PRORES_422: 18.4,
			PRORES_422_LT: 12.75,
			PRORES_PROXY: 5.6
		};
		$BitRate_Update($BitRate);
	}
});
