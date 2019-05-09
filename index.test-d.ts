import {expectType, expectError} from 'tsd';
import findUp = require('.');

expectType<Promise<string | undefined>>(findUp('unicorn.png'));
expectType<Promise<string | undefined>>(findUp('unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png']));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'directory'}));
expectError(findUp(['rainbow.png', 'unicorn.png'], {concurrency: 1}))

expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(() => undefined));
expectType<Promise<string | undefined>>(findUp(() => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp((): findUp.StopSymbol => findUp.stop));
expectType<Promise<string | undefined>>(findUp((): findUp.StopSymbol => findUp.stop, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => undefined));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<findUp.StopSymbol> => findUp.stop));
expectType<Promise<string | undefined>>(findUp(async (): Promise<findUp.StopSymbol> => findUp.stop, {cwd: ''}));

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
expectType<string | undefined>(findUp.sync((): findUp.StopSymbol => findUp.stop));
expectType<string | undefined>(findUp.sync((): findUp.StopSymbol => findUp.stop, {cwd: ''}));

expectType<boolean>(findUp.sync.exists('unicorn.png'));
expectType<boolean>(findUp.sync.isDirectory('unicorn.png'));
expectType<boolean>(findUp.sync.isFile('unicorn.png'));
expectType<boolean>(findUp.sync.isSymlink('unicorn.png'));

expectType<Promise<boolean>>(findUp.exists('unicorn.png'));
expectType<Promise<boolean>>(findUp.isDirectory('unicorn.png'));
expectType<Promise<boolean>>(findUp.isFile('unicorn.png'));
expectType<Promise<boolean>>(findUp.isSymlink('unicorn.png'));

expectType<Symbol>(findUp.stop);
