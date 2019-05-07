import {expectType} from 'tsd';
import findUp = require('.');

expectType<Promise<string | undefined>>(findUp('unicorn.png'));
expectType<Promise<string | undefined>>(findUp('unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png']));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'directory'}));

expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(() => undefined));
expectType<Promise<string | undefined>>(findUp(() => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(() => findUp.stop));
expectType<Promise<string | undefined>>(findUp(() => findUp.stop, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => undefined));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => findUp.stop));
expectType<Promise<string | undefined>>(findUp(async () => findUp.stop, {cwd: ''}));

expectType<string | undefined>(findUp.sync('unicorn.png'));
expectType<string | undefined>(findUp.sync('unicorn.png', {cwd: ''}));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png']));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<string | undefined>(findUp.sync(['rainbow.png', 'unicorn.png'], {type: 'directory'}));

expectType<string | undefined>(findUp.sync(() => 'unicorn.png'));
expectType<string | undefined>(findUp.sync(() => 'unicorn.png', {cwd: ''}));
expectType<string | undefined>(findUp.sync(() => undefined));
expectType<string | undefined>(findUp.sync(() => undefined, {cwd: ''}));
expectType<string | undefined>(findUp.sync(() => findUp.stop));
expectType<string | undefined>(findUp.sync(() => findUp.stop, {cwd: ''}));

expectType<Symbol>(findUp.stop);
