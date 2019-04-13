import {expectType} from 'tsd';
import findUp = require('.');

expectType<Promise<string | null>>(findUp('unicorn.png'));
expectType<Promise<string | null>>(findUp('unicorn.png', {cwd: ''}));
expectType<Promise<string | null>>(findUp(['rainbow.png', 'unicorn.png']));
expectType<Promise<string | null>>(
	findUp(['rainbow.png', 'unicorn.png'], {cwd: ''})
);

expectType<string | null>(findUp.sync('unicorn.png'));
expectType<string | null>(findUp.sync('unicorn.png', {cwd: ''}));
expectType<string | null>(findUp.sync(['rainbow.png', 'unicorn.png']));
expectType<string | null>(
	findUp.sync(['rainbow.png', 'unicorn.png'], {cwd: ''})
);
