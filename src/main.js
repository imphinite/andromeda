require('dotenv').config()
const { Client } = require('discord.js')

// new instance of discord Client
const client = new Client({
    partials: ['MESSAGE', 'REACTION'],
})

// constants
const PREFIX = '$'
const AVAILABLE_COMMANDS = [
    'poll',
    'roles',
]

client.on('ready', () => {
    console.log('Successfully logged in.')
})

client.on('message', (message) => {
    // ignore other bots
    if (message.author.bot) return

    // handle commands
    if (message.content.startsWith(PREFIX)) {
        // parse command
        const [cmd, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/)
        console.log(cmd, args)

        if (!AVAILABLE_COMMANDS.includes(cmd)) return

        if (cmd === 'roles') {
            // send preset class role select message in channel
            sendPresetClassRoleSelectMessage(message)
        }
    }
})


let roleSelectMessage = {}
const CLASS_ROLE_PREFIX = 'class_'

const sendPresetClassRoleSelectMessage = async (message) => {
    const warriorEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}warrior`)
    const rogueEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}rogue`)
    const warlockEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}warlock`)
    const mageEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}mage`)
    const priestEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}priest`)
    const druidEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}druid`)
    const hunterEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}hunter`)
    const paladinEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}paladin`)
    const shamanEmoji = findEmoji(message, `${CLASS_ROLE_PREFIX}shaman`)

    const roleSelectMessageContent = `
        > **请选择你的职业**
        > ${warriorEmoji} 战士
        > ${rogueEmoji} 盗贼
        > ${warlockEmoji} 术士
        > ${mageEmoji} 法师
        > ${priestEmoji} 牧师
        > ${druidEmoji} 德鲁伊
        > ${hunterEmoji} 猎人
        > ${paladinEmoji} 圣骑士
        > ${shamanEmoji} 萨满
    `

    // TODO: get channel id
    const channelId = '842975277851738122'  // 仙女座
    // const channelId = '797692414071537677'  // 妮妹儿

    const channel = await client.channels.fetch(channelId)
    roleSelectMessage = await channel.send(roleSelectMessageContent)

    // re-act to the message
    roleSelectMessage.react(warriorEmoji)
    roleSelectMessage.react(rogueEmoji)
    roleSelectMessage.react(warlockEmoji)
    roleSelectMessage.react(mageEmoji)
    roleSelectMessage.react(priestEmoji)
    roleSelectMessage.react(druidEmoji)
    roleSelectMessage.react(hunterEmoji)
    roleSelectMessage.react(paladinEmoji)
    roleSelectMessage.react(shamanEmoji)
}

const findEmoji = (message, name) => {
    return message.guild.emojis.cache.find(emoji => emoji.name === name)
}

// reaction handler for role select
const CLASS_ROLE_MAPPING = {
    warrior: {
        roleId: '842995822768422932',
        emoji: `${CLASS_ROLE_PREFIX}warrior`,
    },
    priest: {
        roleId: '842997709345652746',
        emoji: `${CLASS_ROLE_PREFIX}priest`,
    },
    rogue: {
        roleId: '842996551877787649',
        emoji: `${CLASS_ROLE_PREFIX}rogue`,
    },
    paladin: {
        roleId: '842997554428903426',
        emoji: `${CLASS_ROLE_PREFIX}paladin`,
    },
    shaman: {
        roleId: '842997132590972938',
        emoji: `${CLASS_ROLE_PREFIX}shaman`,
    },
    hunter: {
        roleId: '842997826560065557',
        emoji: `${CLASS_ROLE_PREFIX}hunter`,
    },
    mage: {
        roleId: '842995319972823101',
        emoji: `${CLASS_ROLE_PREFIX}mage`,
    },
    warlock: {
        roleId: '842995594287906847',
        emoji: `${CLASS_ROLE_PREFIX}warlock`,
    },
    druid: {
        roleId: '842997311960776724',
        emoji: `${CLASS_ROLE_PREFIX}druid`,
    },
}

client.on('messageReactionAdd', (reaction, user) => {
    // ignore bot reactions
    if (user.bot) return

    const messageId = roleSelectMessage.id || '843036170698883073'

    // handle role select add
    if (reaction.message.id === messageId) {
        const { name } = reaction.emoji
        const member = reaction.message.guild.members.cache.get(user.id)
    
        switch (name) {
            case CLASS_ROLE_MAPPING.warrior.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.warrior.roleId)
                break;
            case CLASS_ROLE_MAPPING.priest.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.priest.roleId)
                break;
            case CLASS_ROLE_MAPPING.rogue.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.rogue.roleId)
                break;
            case CLASS_ROLE_MAPPING.paladin.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.paladin.roleId)
                break;
            case CLASS_ROLE_MAPPING.shaman.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.shaman.roleId)
                break;
            case CLASS_ROLE_MAPPING.hunter.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.hunter.roleId)
                break;
            case CLASS_ROLE_MAPPING.mage.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.mage.roleId)
                break;
            case CLASS_ROLE_MAPPING.warlock.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.warlock.roleId)
                break;
            case CLASS_ROLE_MAPPING.druid.emoji:
                member.roles.add(CLASS_ROLE_MAPPING.druid.roleId)
                break;
        }
    }
})
client.on('messageReactionRemove', (reaction, user) => {
    // ignore bot reactions
    if (user.bot) return

    const messageId = roleSelectMessage.id || '843036170698883073'

    // handle role select remove
    if (reaction.message.id === messageId) {
        const { name } = reaction.emoji
        const member = reaction.message.guild.members.cache.get(user.id)
    
        switch (name) {
            case CLASS_ROLE_MAPPING.warrior.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.warrior.roleId)
                break;
            case CLASS_ROLE_MAPPING.priest.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.priest.roleId)
                break;
            case CLASS_ROLE_MAPPING.rogue.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.rogue.roleId)
                break;
            case CLASS_ROLE_MAPPING.paladin.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.paladin.roleId)
                break;
            case CLASS_ROLE_MAPPING.shaman.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.shaman.roleId)
                break;
            case CLASS_ROLE_MAPPING.hunter.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.hunter.roleId)
                break;
            case CLASS_ROLE_MAPPING.mage.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.mage.roleId)
                break;
            case CLASS_ROLE_MAPPING.warlock.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.warlock.roleId)
                break;
            case CLASS_ROLE_MAPPING.druid.emoji:
                member.roles.remove(CLASS_ROLE_MAPPING.druid.roleId)
                break;
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)

