---
title: "SFZ Support Status"
---
Following the progress status of the opcode support,
the detailed opcode list table is [here](opcodes).

{% include sfizz/sfz_support.liquid %}

<p class="text-center">
	<span class="badge badge-success">Complete</span>
	<span class="badge badge-warning">Work In Progress</span>
</p>

## Supported Headers

All headers except <[sample](https://sfzformat.com/headers/sample)>
are currently supported.

## Supported Operating Systems

{% for os in site.data.sfizz.support.os %}
- {{ os.name }}{%-comment-%} no paragraph {%-endcomment-%}
{% endfor %}
