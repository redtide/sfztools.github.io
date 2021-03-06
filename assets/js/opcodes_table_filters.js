$(function() {

// read a search parameter from URL if any, e.g.:
// https://sfz.tools/sfizz/development/status/opcodes/?q=ampeg_decay
const urlParams = new URLSearchParams(window.location.search);
const query     = urlParams.get('q');

if (!$.isEmptyObject(query)) $('#search-opcodes').val(query);

var $opcodeTable = $('#table-opcodes');
var $opcodeSearch = $('#search-opcodes');
var $versionFilters = $('.versions-checkbox');
var $categoryFilters = $('.categories-checkbox');
var $supportFilters = $('.support-checkbox');

var categoryColumnNumber = 0;
var opcodeColumnNumber = 1;
var versionColumnNumber = 2;

var updateTable = function() {
	var searchText = $opcodeSearch.val();
	var activeVersionFilters = $versionFilters.filter(':checked')
			.map(function() { return $(this).val(); }).toArray();
	var activeCategoryFilters = $categoryFilters.filter(':checked')
			.map(function() { return $(this).val(); }).toArray();
	var activeSupportFilters = $supportFilters.filter(':checked')
			.map(function() { return $(this).val(); }).toArray();

	var acceptRow = function($row) {
		if (searchText !== "") {
			var text = $row.find('td').eq(opcodeColumnNumber).text();
			if (!text.includes(searchText))
				return false;
		}

		if (activeVersionFilters.length > 0) {
			var text = $row.find('td').eq(versionColumnNumber).text();
			if (!activeVersionFilters.includes(text))
				return false;
		}

		if (activeCategoryFilters.length > 0) {
			var text = $row.find('td').eq(categoryColumnNumber).text();
			if (!activeCategoryFilters.includes(text))
				return false;
		}

		if (activeSupportFilters.length > 0) {
			var text = $row.find('img').attr("title");
			if (!activeSupportFilters.includes(text))
				return false;
		}

		return true;
	};

	// go over all rows and apply the filter function
	$('tbody tr', self.$table).each(function() {
		var $row = $(this);
		if (acceptRow($row))
			$row.show();
		else
			$row.hide();
	});
};

// update the rows on checkbox toggled, or search box edited
$opcodeSearch.on('input', null, updateTable);
$versionFilters.on('change', null, updateTable);
$categoryFilters.on('change', null, updateTable);
$supportFilters.on('change', null, updateTable);

// update after the table was sorted
$opcodeTable.on('reset-view.bs.table', updateTable);

if (!$.isEmptyObject(query)) updateTable();
});
